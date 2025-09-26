import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const learningAreaId = searchParams.get('learningAreaId');
    const yearLevel = searchParams.get('yearLevel');
    const limit = parseInt(searchParams.get('limit') || '100');

    console.log('Curriculum search request:', { learningAreaId, yearLevel, limit });

    // Build query for curriculum_data table
    let query = supabase
      .from('curriculum_data')
      .select('*');

    // Filter by learning area if provided
    if (learningAreaId) {
      query = query.eq('learning_area', learningAreaId);
    }

    // Filter by year level if provided
    if (yearLevel) {
      query = query.eq('level', yearLevel);
    }

    // Execute query with limit
    const { data, error } = await query.limit(limit);

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch curriculum data', details: error.message },
        { status: 500 }
      );
    }

    console.log(`Found ${data?.length || 0} curriculum items`);

    // Transform data to match expected format
    const outcomes = (data || []).map(item => ({
      id: item.id,
      "Learning Area": item.learning_area,
      "Subject": item.subject,
      "Level": item.level,
      "Strand": item.strand,
      "Sub-Strand": item.sub_strand,
      "Content Description": item.content_description,
      "Elaboration": item.elaboration,
      "Achievement Standard": item.achievement_standard,
      "Code": item.content_descriptor_code,
      "Topics": item.topics,
      // Legacy field names for backward compatibility
      learning_area: item.learning_area,
      subject: item.subject,
      level: item.level,
      strand: item.strand,
      sub_strand: item.sub_strand,
      content_description: item.content_description,
      elaboration: item.elaboration,
      achievement_standard: item.achievement_standard,
      content_descriptor_code: item.content_descriptor_code,
      topics: item.topics
    }));

    return NextResponse.json({
      outcomes,
      total: outcomes.length,
      limited: outcomes.length
    });

  } catch (error) {
    console.error('Curriculum search error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch curriculum data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}