# AI-Powered Lesson Plan Generator

This implementation provides a complete end-to-end solution for generating AI-powered lesson plans using Anthropic's Claude API, integrated with the Australian Curriculum data.

## Features

- **AI-Powered Generation**: Uses Claude 3.5 Sonnet to generate structured lesson plans
- **Australian Curriculum Integration**: Fetches real curriculum data from Supabase storage
- **Structured Output**: JSON schema ensures consistent, predictable lesson plan format
- **Teacher-Friendly UI**: Intuitive dashboard for selecting curriculum items and preferences
- **Compliance Features**: Includes Indigenous perspectives, trauma-informed strategies, and differentiation
- **Export Options**: Print and JSON export functionality

## Architecture

### Data Flow

1. **UI (Dashboard)**: Teacher selects subject, year level, curriculum items, and preferences
2. **API Route**: `/api/lesson-plan/generate` processes the request
3. **Curriculum Service**: Fetches canonical curriculum text from Supabase
4. **Anthropic API**: Generates structured lesson plan using Claude
5. **Response**: Returns JSON lesson plan to UI for display

### Key Components

- **Types** (`types/lesson-plan.ts`): TypeScript interfaces for lesson plans
- **Schemas** (`schemas/lesson-plan.ts`): JSON schema for structured output
- **API Route** (`app/api/lesson-plan/generate/route.ts`): Next.js API endpoint
- **Curriculum Service** (`lib/curriculum-service.ts`): Enhanced with lesson plan methods
- **UI Components**: Generator and display components

## Setup

### 1. Environment Variables

Copy `env.local.example` to `.env.local` and add your Anthropic API key:

```bash
cp env.local.example .env.local
```

Add your Anthropic API key:
```
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### 2. Install Dependencies

```bash
npm install @anthropic-ai/sdk --legacy-peer-deps
```

### 3. Run the Application

```bash
npm run dev
```

## Usage

### 1. Access the Dashboard

Navigate to `/dashboard` to access the lesson plan generator.

### 2. Configure Lesson Parameters

- **Subject**: Select from available subjects (English, Mathematics, Science, etc.)
- **Year Level**: Choose the target year level
- **Duration**: Set lesson duration in minutes
- **Class Profile**: Configure class size and literacy tier
- **Options**: Enable Indigenous perspectives, trauma-informed strategies, differentiation level, and assessment style

### 3. Select Curriculum Items

- Browse available curriculum items for the selected subject and year level
- Add curriculum codes to your selection
- Each item includes the official ACARA content description

### 4. Generate Lesson Plan

Click "Generate Lesson Plan" to create an AI-powered lesson plan that includes:
- Learning goals aligned to selected curriculum items
- Detailed timing breakdown with activities
- Teacher moves and student tasks
- Resources and materials
- Differentiation strategies
- Assessment methods
- Compliance summary

### 5. Export and Print

- **Print**: Use the print button for a formatted print view
- **Export**: Download the lesson plan as JSON for further editing

## API Reference

### POST `/api/lesson-plan/generate`

Generates a lesson plan using Claude AI.

**Request Body:**
```typescript
{
  subject: string;
  yearLevels: string[];
  items: Array<{ code: string; title?: string }>;
  durationMins: number;
  classProfile?: {
    size?: number;
    literacyTier?: "mixed" | "lower" | "higher";
    additionalNeeds?: string[];
  };
  options: {
    embedIndigenousPerspectives: boolean;
    traumaInformedScaffolds: boolean;
    differentiation: "low" | "medium" | "high";
    assessmentStyle?: "formative" | "summative" | "rubric-upload" | "acara-standard" | "vcaa";
  };
}
```

**Response:**
```typescript
{
  lessonPlan: {
    title: string;
    overview: string;
    learningGoals: string[];
    linkedCurriculum: Array<{ code: string; description: string }>;
    timingBreakdown: Array<{
      minutes: number;
      activity: string;
      teacherMoves?: string;
      studentTasks?: string;
    }>;
    resources: string[];
    indigenousPerspectives?: string;
    traumaInformedStrategies?: string;
    differentiation: {
      access: string;
      extension: string;
    };
    assessment: {
      style: string;
      method: string;
      successCriteria?: string[];
    };
    notesForTeacher?: string;
    printableComplianceSummary: string;
  };
}
```

## Curriculum Integration

The system integrates with the Australian Curriculum v9 data stored in Supabase:

- **Learning Areas**: Content descriptions and elaborations
- **Achievement Standards**: Assessment criteria
- **Cross-Curriculum Priorities**: Indigenous perspectives, sustainability, Asia and Australia's engagement with Asia
- **General Capabilities**: Literacy, numeracy, ICT, critical and creative thinking, etc.

## AI Prompt Engineering

The system uses carefully crafted prompts to ensure:

- **Grounded Responses**: Only uses provided curriculum text, no invented codes
- **Australian Context**: Focuses on Australian curriculum terminology and practices
- **Pedagogical Soundness**: Age-appropriate activities and evidence-based strategies
- **Compliance**: Includes required elements for curriculum alignment
- **Differentiation**: Invisible differentiation and multiple pathways
- **Cultural Sensitivity**: Respectful Indigenous perspectives integration

## Error Handling

- **Validation**: Input validation for required fields
- **API Errors**: Graceful handling of Anthropic API failures
- **Curriculum Lookup**: Fallback for missing curriculum items
- **JSON Parsing**: Error handling for malformed AI responses

## Security Considerations

- **API Key**: Store Anthropic API key securely in environment variables
- **Rate Limiting**: Consider implementing rate limiting for production use
- **Input Sanitization**: All user inputs are validated and sanitized
- **No Student Data**: System does not store or process student-identifiable information

## Future Enhancements

- **Streaming Responses**: Real-time lesson plan generation
- **Template System**: Save and reuse lesson plan templates
- **Collaboration**: Multi-teacher lesson plan development
- **Analytics**: Track lesson plan usage and effectiveness
- **Integration**: Connect with school management systems
- **Mobile App**: Native mobile application for teachers

## Troubleshooting

### Common Issues

1. **Missing API Key**: Ensure `ANTHROPIC_API_KEY` is set in `.env.local`
2. **Curriculum Data Not Loading**: Check Supabase connection and storage URLs
3. **Generation Fails**: Verify API key permissions and rate limits
4. **UI Not Loading**: Check for TypeScript errors and missing dependencies

### Debug Mode

Enable debug logging by adding to your environment:
```
DEBUG=lesson-plan:*
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
