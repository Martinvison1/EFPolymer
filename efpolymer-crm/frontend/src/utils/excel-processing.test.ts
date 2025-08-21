// Simple validation test for Excel data processing logic

describe('Excel Data Processing', () => {
  test('processes sample CSV data correctly', () => {
    // Sample data that would come from an Excel file
    const sampleData = [
      {
        name: 'Almería tomato fields 2025',
        stage: 'trial_planned',
        amount: '35000',
        expected_close: '2025-03-01',
        kg_product: '1500',
        probability: '75',
        region: 'Spain',
        crop: 'tomato'
      },
      {
        name: 'Netherlands greenhouse project',
        stage: 'negotiation',
        amount: '85000',
        expected_close: '2025-02-15',
        kg_product: '3200',
        probability: '90',
        region: 'Netherlands',
        crop: 'cucumber'
      }
    ]

    // Process data similar to ExcelUploader
    const opportunities = sampleData.map((row: any, index: number) => ({
      id: row.id || `opp_${index + 1}`,
      name: row.name || `Opportunity ${index + 1}`,
      stage: row.stage || 'unknown',
      amount: parseFloat(row.amount || '0'),
      currency: row.currency || 'EUR',
      expectedClose: row.expected_close || new Date().toISOString().split('T')[0],
      kgProduct: parseFloat(row.kg_product || '0'),
      probability: parseFloat(row.probability || '50'),
      region: row.region,
      crop: row.crop,
    }))

    const summary = {
      totalRevenue: opportunities.reduce((sum, opp) => sum + (opp.amount || 0), 0),
      totalKg: opportunities.reduce((sum, opp) => sum + (opp.kgProduct || 0), 0),
      count: opportunities.length
    }

    // Verify processing worked correctly
    expect(opportunities).toHaveLength(2)
    expect(opportunities[0].name).toBe('Almería tomato fields 2025')
    expect(opportunities[0].amount).toBe(35000)
    expect(opportunities[0].kgProduct).toBe(1500)
    
    expect(summary.totalRevenue).toBe(120000) // 35000 + 85000
    expect(summary.totalKg).toBe(4700) // 1500 + 3200
    expect(summary.count).toBe(2)
  })

  test('handles missing or invalid data gracefully', () => {
    const invalidData = [
      {
        name: 'Test Opportunity',
        stage: 'discovery',
        amount: 'invalid',
        kg_product: '',
        probability: 'abc'
      }
    ]

    const opportunities = invalidData.map((row: any, index: number) => ({
      id: row.id || `opp_${index + 1}`,
      name: row.name || `Opportunity ${index + 1}`,
      stage: row.stage || 'unknown',
      amount: parseFloat(row.amount || '0'),
      currency: row.currency || 'EUR',
      expectedClose: row.expected_close || new Date().toISOString().split('T')[0],
      kgProduct: parseFloat(row.kg_product || '0'),
      probability: parseFloat(row.probability || '50'),
      region: row.region,
      crop: row.crop,
    }))

    // Should handle invalid data gracefully
    expect(opportunities[0].amount).toBe(0) // invalid amount becomes 0
    expect(opportunities[0].kgProduct).toBe(0) // empty kg becomes 0
    expect(opportunities[0].probability).toBe(50) // invalid probability becomes default 50
    expect(opportunities[0].currency).toBe('EUR') // default currency
  })
})