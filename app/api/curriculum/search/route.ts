import { NextRequest, NextResponse } from 'next/server';
import { CurriculumService } from '../../../../lib/curriculum-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const learningAreaId = searchParams.get('learningAreaId');
    const yearLevel = searchParams.get('yearLevel');
    const limit = parseInt(searchParams.get('limit') || '100');

    // Fetch all curriculum data from Supabase Storage
    const curriculumData = await CurriculumService.fetchAllCurriculumData();
    
    // Combine all curriculum items
    const allItems = [
      ...curriculumData.learning_areas,
      ...curriculumData.achievement_standards,
      ...curriculumData.cross_curriculum_priorities,
      ...curriculumData.general_capabilities
    ];

    // Filter by learning area/subject if provided
    let filteredItems = allItems;
    
    if (learningAreaId) {
      filteredItems = filteredItems.filter(item => {
        const itemSubject = item["Subject"] || item.subject || item["Learning Area"] || item.learning_area;
        return itemSubject && itemSubject.toLowerCase().includes(learningAreaId.toLowerCase());
      });
    }

    // Filter by year level if provided
    if (yearLevel) {
      filteredItems = filteredItems.filter(item => {
        const itemLevel = item["Level"] || item.level || item["Level Description"] || item.level_description;
        return itemLevel && itemLevel.toLowerCase().includes(yearLevel.toLowerCase());
      });
    }

    // Limit results
    const limitedItems = filteredItems.slice(0, limit);

    return NextResponse.json({
      outcomes: limitedItems,
      total: filteredItems.length,
      limited: limitedItems.length
    });

  } catch (error) {
    console.error('Curriculum search error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch curriculum data' },
      { status: 500 }
    );
  }
}