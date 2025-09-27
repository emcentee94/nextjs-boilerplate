import { NextRequest, NextResponse } from 'next/server'
import PDFDocument from 'pdfkit'
import { Packer, Document, Paragraph, HeadingLevel, TextRun } from 'docx'

export const dynamic = 'force-dynamic'

function lessonPlanToPlain(lp: any) {
  return {
    title: lp?.title || 'Lesson Plan',
    overview: lp?.overview || '',
    learningGoals: lp?.learningGoals || [],
    linkedCurriculum: lp?.linkedCurriculum || [],
    lessonTimeline: lp?.lessonTimeline || [],
    resources: lp?.resources || [],
    indigenousPerspectives: lp?.indigenousPerspectives || '',
    traumaInformedStrategies: lp?.traumaInformedStrategies || [],
    differentiation: lp?.differentiation || {},
    assessment: lp?.assessment || {},
    notesForTeacher: lp?.notesForTeacher || '',
    complianceSummary: lp?.complianceSummary || '',
  }
}

export async function POST(req: NextRequest) {
  try {
    const { format, lessonPlan } = await req.json()
    if (!lessonPlan || (format !== 'pdf' && format !== 'docx')) {
      return NextResponse.json(
        { error: 'Missing lessonPlan or invalid format' },
        { status: 400 }
      )
    }
    const lp = lessonPlanToPlain(lessonPlan)

    if (format === 'pdf') {
      const doc = new PDFDocument({ margin: 50 })
      const chunks: Buffer[] = []
      doc.on('data', (c) => chunks.push(c as Buffer))
      const done = new Promise<Buffer>((resolve) => {
        doc.on('end', () => resolve(Buffer.concat(chunks)))
      })

      doc.fontSize(20).text(lp.title, { underline: true })
      doc
        .moveDown()
        .fontSize(12)
        .text(lp.overview || '')

      if (lp.learningGoals?.length) {
        doc.moveDown().fontSize(14).text('Learning Goals', { bold: true })
        lp.learningGoals.forEach((g: string) => doc.fontSize(12).text(`• ${g}`))
      }

      if (lp.linkedCurriculum?.length) {
        doc.moveDown().fontSize(14).text('Linked Curriculum')
        lp.linkedCurriculum.forEach((c: any) =>
          doc.fontSize(12).text(`• ${c.code}: ${c.description}`)
        )
      }

      if (lp.lessonTimeline?.length) {
        doc.moveDown().fontSize(14).text('Lesson Timeline')
        lp.lessonTimeline.forEach((i: any) => {
          doc.fontSize(12).text(`${i.minutes} min – ${i.activity}`)
          if (i.teacherMoves?.length)
            doc.text(` Teacher: ${i.teacherMoves.join(', ')}`)
          if (i.studentTasks?.length)
            doc.text(` Students: ${i.studentTasks.join(', ')}`)
        })
      }

      if (lp.resources?.length) {
        doc.moveDown().fontSize(14).text('Resources')
        lp.resources.forEach((r: string) => doc.fontSize(12).text(`• ${r}`))
      }

      if (lp.traumaInformedStrategies?.length) {
        doc.moveDown().fontSize(14).text('Trauma-Informed Strategies')
        lp.traumaInformedStrategies.forEach((t: string) =>
          doc.fontSize(12).text(`• ${t}`)
        )
      }

      if (lp.indigenousPerspectives) {
        doc.moveDown().fontSize(14).text('Indigenous Perspectives')
        doc.fontSize(12).text(lp.indigenousPerspectives)
      }

      if (lp.assessment) {
        doc.moveDown().fontSize(14).text('Assessment')
        const a = lp.assessment
        if (a.style) doc.fontSize(12).text(`Style: ${a.style}`)
        if (a.methods?.length)
          doc.fontSize(12).text(`Methods: ${a.methods.join(', ')}`)
        if (a.successCriteria?.length) {
          doc.fontSize(12).text('Success Criteria:')
          a.successCriteria.forEach((s: string) => doc.text(`• ${s}`))
        }
      }

      if (lp.differentiation) {
        doc.moveDown().fontSize(14).text('Differentiation')
        const d = lp.differentiation
        if (d.access?.length)
          doc.fontSize(12).text(`Access: ${d.access.join(', ')}`)
        if (d.extension?.length)
          doc.fontSize(12).text(`Extension: ${d.extension.join(', ')}`)
      }

      if (lp.notesForTeacher) {
        doc.moveDown().fontSize(14).text('Notes for Teacher')
        doc.fontSize(12).text(lp.notesForTeacher)
      }

      if (lp.complianceSummary) {
        doc.moveDown().fontSize(14).text('Compliance Summary')
        doc.fontSize(12).text(lp.complianceSummary)
      }

      doc.end()
      const buffer = await done
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="lesson-plan.pdf"`,
        },
      })
    }

    // DOCX
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({ text: lp.title, heading: HeadingLevel.TITLE }),
            new Paragraph(lp.overview || ''),
            ...(lp.learningGoals?.length
              ? [
                  new Paragraph({
                    text: 'Learning Goals',
                    heading: HeadingLevel.HEADING_2,
                  }),
                  ...lp.learningGoals.map(
                    (g: string) => new Paragraph(`• ${g}`)
                  ),
                ]
              : []),
            ...(lp.linkedCurriculum?.length
              ? [
                  new Paragraph({
                    text: 'Linked Curriculum',
                    heading: HeadingLevel.HEADING_2,
                  }),
                  ...lp.linkedCurriculum.map(
                    (c: any) => new Paragraph(`• ${c.code}: ${c.description}`)
                  ),
                ]
              : []),
            ...(lp.lessonTimeline?.length
              ? [
                  new Paragraph({
                    text: 'Lesson Timeline',
                    heading: HeadingLevel.HEADING_2,
                  }),
                  ...lp.lessonTimeline.map(
                    (i: any) =>
                      new Paragraph(`${i.minutes} min – ${i.activity}`)
                  ),
                ]
              : []),
            ...(lp.resources?.length
              ? [
                  new Paragraph({
                    text: 'Resources',
                    heading: HeadingLevel.HEADING_2,
                  }),
                  ...lp.resources.map((r: string) => new Paragraph(`• ${r}`)),
                ]
              : []),
            ...(lp.traumaInformedStrategies?.length
              ? [
                  new Paragraph({
                    text: 'Trauma-Informed Strategies',
                    heading: HeadingLevel.HEADING_2,
                  }),
                  ...lp.traumaInformedStrategies.map(
                    (t: string) => new Paragraph(`• ${t}`)
                  ),
                ]
              : []),
            ...(lp.indigenousPerspectives
              ? [
                  new Paragraph({
                    text: 'Indigenous Perspectives',
                    heading: HeadingLevel.HEADING_2,
                  }),
                  new Paragraph(lp.indigenousPerspectives),
                ]
              : []),
            ...(lp.assessment
              ? [
                  new Paragraph({
                    text: 'Assessment',
                    heading: HeadingLevel.HEADING_2,
                  }),
                  ...(lp.assessment.style
                    ? [new Paragraph(`Style: ${lp.assessment.style}`)]
                    : []),
                  ...(lp.assessment.methods?.length
                    ? [
                        new Paragraph(
                          `Methods: ${lp.assessment.methods.join(', ')}`
                        ),
                      ]
                    : []),
                  ...(lp.assessment.successCriteria?.length
                    ? [
                        new Paragraph('Success Criteria:'),
                        ...lp.assessment.successCriteria.map(
                          (s: string) => new Paragraph(`• ${s}`)
                        ),
                      ]
                    : []),
                ]
              : []),
            ...(lp.differentiation
              ? [
                  new Paragraph({
                    text: 'Differentiation',
                    heading: HeadingLevel.HEADING_2,
                  }),
                  ...(lp.differentiation.access?.length
                    ? [
                        new Paragraph(
                          `Access: ${lp.differentiation.access.join(', ')}`
                        ),
                      ]
                    : []),
                  ...(lp.differentiation.extension?.length
                    ? [
                        new Paragraph(
                          `Extension: ${lp.differentiation.extension.join(', ')}`
                        ),
                      ]
                    : []),
                ]
              : []),
            ...(lp.notesForTeacher
              ? [
                  new Paragraph({
                    text: 'Notes for Teacher',
                    heading: HeadingLevel.HEADING_2,
                  }),
                  new Paragraph(lp.notesForTeacher),
                ]
              : []),
            ...(lp.complianceSummary
              ? [
                  new Paragraph({
                    text: 'Compliance Summary',
                    heading: HeadingLevel.HEADING_2,
                  }),
                  new Paragraph(lp.complianceSummary),
                ]
              : []),
          ],
        },
      ],
    })
    const buffer = await Packer.toBuffer(doc)
    return new NextResponse(buffer, {
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="lesson-plan.docx"`,
      },
    })
  } catch (e) {
    console.error('Export error:', e)
    return NextResponse.json({ error: 'Failed to export' }, { status: 500 })
  }
}
