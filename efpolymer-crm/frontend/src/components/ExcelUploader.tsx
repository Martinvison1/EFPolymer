import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import * as XLSX from 'xlsx'
import { CloudArrowUpIcon } from '@heroicons/react/24/outline'

export interface ExcelData {
  opportunities: OpportunityData[]
  summary: {
    totalRevenue: number
    totalKg: number
    count: number
  }
}

export interface OpportunityData {
  id: string
  name: string
  stage: string
  amount: number
  currency: string
  expectedClose: string
  kgProduct: number
  probability: number
  region?: string
  crop?: string
}

interface ExcelUploaderProps {
  onDataLoaded: (data: ExcelData) => void
  onError: (error: string) => void
}

export function ExcelUploader({ onDataLoaded, onError }: ExcelUploaderProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [fileName, setFileName] = useState<string>('')

  const processExcelFile = useCallback((file: File) => {
    setIsProcessing(true)
    setFileName(file.name)

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })
        
        // Assume first sheet contains opportunity data
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const jsonData = XLSX.utils.sheet_to_json(worksheet)

        // Parse and transform data
        const opportunities: OpportunityData[] = jsonData.map((row: any, index: number) => ({
          id: row.id || `opp_${index + 1}`,
          name: row.name || row.opportunity_name || row['Opportunity Name'] || `Opportunity ${index + 1}`,
          stage: row.stage || row.pipeline_stage || row['Pipeline Stage'] || 'unknown',
          amount: parseFloat(row.amount || row.revenue || row['Revenue'] || '0'),
          currency: row.currency || 'EUR',
          expectedClose: row.expected_close || row.close_date || row['Expected Close'] || new Date().toISOString().split('T')[0],
          kgProduct: parseFloat(row.kg_product || row.kg || row['Kg Product'] || row.quantity || '0'),
          probability: parseFloat(row.probability || row['Probability'] || '50'),
          region: row.region || row.location || row['Region'],
          crop: row.crop || row['Crop Type'] || row.crop_type,
        }))

        const summary = {
          totalRevenue: opportunities.reduce((sum, opp) => sum + (opp.amount || 0), 0),
          totalKg: opportunities.reduce((sum, opp) => sum + (opp.kgProduct || 0), 0),
          count: opportunities.length
        }

        onDataLoaded({
          opportunities,
          summary
        })
      } catch (error) {
        console.error('Error processing Excel file:', error)
        onError('Failed to parse Excel file. Please check the format and try again.')
      } finally {
        setIsProcessing(false)
      }
    }

    reader.onerror = () => {
      setIsProcessing(false)
      onError('Failed to read the file. Please try again.')
    }

    reader.readAsArrayBuffer(file)
  }, [onDataLoaded, onError])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      processExcelFile(file)
    }
  }, [processExcelFile])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    multiple: false
  })

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} disabled={isProcessing} />
        
        <div className="flex flex-col items-center space-y-4">
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-sm text-gray-600">Processing {fileName}...</p>
            </>
          ) : (
            <>
              <CloudArrowUpIcon className="w-12 h-12 text-gray-400" />
              <div>
                <p className="text-lg font-medium text-gray-900">
                  {isDragActive ? 'Drop your Excel file here' : 'Upload Excel file'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Drag & drop or click to select (.xlsx, .xls)
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        <p><strong>Expected columns:</strong> name, stage, amount, expected_close, kg_product, probability, region, crop</p>
        <p>Column names are flexible (e.g., "Revenue" for amount, "Kg Product" for kg_product)</p>
      </div>
    </div>
  )
}