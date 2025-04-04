import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://rxnmvhmqgdwjiutoppth.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4bm12aG1xZ2R3aml1dG9wcHRoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzYxNDk1NSwiZXhwIjoyMDU5MTkwOTU1fQ.kAV9cfHsc0OPw27n59QsvkbExKE3uKJudQ-aWL-pnmU'

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

interface TableInfo {
  tablename: string
}

interface ColumnInfo {
  column_name: string
  data_type: string
  is_nullable: string
  column_default: string | null
  character_maximum_length: number | null
}

async function getSchema() {
  try {
    console.log('Connecting to Supabase...')
    
    // Get all tables in the public schema
    const { data: tables, error: tablesError } = await supabase
      .from('pg_tables')
      .select('tablename')
      .eq('schemaname', 'public') as { data: TableInfo[] | null, error: any }

    if (tablesError) {
      console.error('Error fetching tables:', tablesError)
      return
    }

    if (!tables || tables.length === 0) {
      console.log('No tables found in the public schema')
      return
    }

    console.log('✅ Successfully connected to Supabase!')
    console.log('\nDatabase Schema:')
    console.log('================\n')

    // Sort tables by name
    const sortedTables = tables.sort((a, b) => a.tablename.localeCompare(b.tablename))

    // For each table, get its columns
    for (const table of sortedTables) {
      console.log(`📋 Table: ${table.tablename}`)

      // Get column information
      const { data: columns, error: columnsError } = await supabase
        .from('information_schema.columns')
        .select('column_name, data_type, is_nullable, column_default, character_maximum_length')
        .eq('table_schema', 'public')
        .eq('table_name', table.tablename)
        .order('ordinal_position') as { data: ColumnInfo[] | null, error: any }

      if (columnsError) {
        console.error(`Error getting columns for ${table.tablename}:`, columnsError)
        continue
      }

      if (columns && columns.length > 0) {
        console.log('   Columns:')
        columns.forEach(col => {
          let definition = `   • ${col.column_name} ${col.data_type}`
          if (col.character_maximum_length) {
            definition += `(${col.character_maximum_length})`
          }
          if (col.is_nullable === 'NO') {
            definition += ' NOT NULL'
          }
          if (col.column_default) {
            definition += ` DEFAULT ${col.column_default}`
          }
          console.log(definition)
        })
      }
      console.log('')
    }
  } catch (error) {
    console.error('Error:', error)
    console.log('\nTroubleshooting tips:')
    console.log('1. Check if your Supabase URL and API key are correct')
    console.log('2. Ensure you have an active internet connection')
    console.log('3. Verify that you have the necessary permissions')
    console.log('\nAlternative: You can view your schema in the Supabase Dashboard:')
    console.log('https://app.supabase.com/project/rxnmvhmqgdwjiutoppth/database/tables')
  }
}

// Execute the function
getSchema() 