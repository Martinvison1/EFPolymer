# Excel File Format for BI Dashboard

The BI Dashboard accepts Excel files (.xlsx, .xls) with opportunity data. The system is flexible with column names and will try to map common variations.

## Required/Recommended Columns

### Core Opportunity Data
- **name** (or "Opportunity Name", "opportunity_name"): Name of the opportunity
- **stage** (or "Pipeline Stage", "pipeline_stage"): Current pipeline stage
- **amount** (or "Revenue", "revenue"): Revenue amount in numbers
- **expected_close** (or "Expected Close", "close_date"): Expected closing date (YYYY-MM-DD format preferred)
- **kg_product** (or "Kg Product", "kg", "quantity"): Product quantity in kilograms

### Optional Columns
- **currency**: Currency code (defaults to "EUR")
- **probability**: Win probability percentage (defaults to 50)
- **region** (or "Region", "location"): Geographic region
- **crop** (or "Crop Type", "crop_type"): Type of crop
- **id**: Unique identifier (auto-generated if not provided)

## Sample Excel Structure

| name | stage | amount | expected_close | kg_product | probability | region | crop |
|------|-------|---------|---------------|------------|------------|--------|------|
| Almería tomato fields 2025 | trial_planned | 35000 | 2025-03-01 | 1500 | 75 | Spain | tomato |
| Netherlands greenhouse project | negotiation | 85000 | 2025-02-15 | 3200 | 90 | Netherlands | cucumber |
| Morocco citrus expansion | discovery | 45000 | 2025-04-20 | 2100 | 60 | Morocco | citrus |

## Pipeline Stages
- prospecting
- discovery  
- trial_planned
- trial_running
- trial_result
- proposal
- negotiation
- closed_won
- closed_lost
- on_hold

## Notes
- Column names are case-insensitive and flexible
- Missing data will be handled gracefully with defaults
- Dates can be in various formats but YYYY-MM-DD is preferred
- Numerical fields should contain valid numbers
- The first sheet in the Excel file will be used for data