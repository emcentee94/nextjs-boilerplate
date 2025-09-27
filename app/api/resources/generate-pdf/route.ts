import { NextRequest, NextResponse } from 'next/server'
import { VCAACurriculumPDFGenerator } from '@/lib/pdf-generator/vcaa-curriculum-pdf'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const generator = new VCAACurriculumPDFGenerator()
    const sampleData = VCAACurriculumPDFGenerator.getSampleCurriculumData()

    const pdfPath = await generator.generateCurriculumPDF(sampleData)

    return NextResponse.json({
      success: true,
      message: 'PDF generated successfully',
      path: pdfPath,
      downloadUrl: '/resources/vcaa-curriculum-complete-guide.pdf',
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate PDF' },
      { status: 500 }
    )
  }
}
