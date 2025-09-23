// Curriculum Data Service
// Fetches curriculum data from Supabase Storage URLs

export interface CurriculumItem {
  id: string
  "Learning Area"?: string
  "Subject"?: string
  "Level"?: string
  "Level Description"?: string
  "Code"?: string
  "Pathway"?: string
  "Sequence"?: string
  "Strand"?: string
  "Sub-Strand"?: string
  "Content Description"?: string
  "Elaboration"?: string
  "Topics"?: string
  "Achievement Standard"?: string
  "Description"?: string
  "Organising ideas title"?: string
  "Organising idea indicator"?: string
  "Element"?: string
  "Sub-Element"?: string
  "Indicator"?: string
  // Legacy field names for backward compatibility
  learning_area?: string
  subject?: string
  level?: string
  level_description?: string
  code?: string
  pathway?: string
  sequence?: string
  strand?: string
  sub_strand?: string
  content_description?: string
  elaboration?: string
  topics?: string[]
  achievement_standard?: string
  description?: string
  organising_ideas_title?: string
  organising_idea_indicator?: string
  element?: string
  sub_element?: string
  indicator?: string
}

export interface CurriculumData {
  learning_areas: CurriculumItem[]
  achievement_standards: CurriculumItem[]
  cross_curriculum_priorities: CurriculumItem[]
  general_capabilities: CurriculumItem[]
}

// Supabase Storage URLs
const CURRICULUM_URLS = {
  learning_areas: 'https://kpdusbhqiswdiyzdwxpw.supabase.co/storage/v1/object/public/V9%20CURRISULUM1/curriculum/learning_areas.json',
  achievement_standards: 'https://kpdusbhqiswdiyzdwxpw.supabase.co/storage/v1/object/public/V9%20CURRISULUM1/curriculum/achievement_standards.json',
  cross_curriculum_priorities: 'https://kpdusbhqiswdiyzdwxpw.supabase.co/storage/v1/object/public/V9%20CURRISULUM1/curriculum/cross_curriculum_priorities.json',
  general_capabilities: 'https://kpdusbhqiswdiyzdwxpw.supabase.co/storage/v1/object/public/V9%20CURRISULUM1/curriculum/general_capabilities.json'
}

// Cache for curriculum data
let curriculumCache: CurriculumData | null = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours

export class CurriculumService {
  /**
   * Fetch all curriculum data from Supabase Storage
   */
  static async fetchAllCurriculumData(): Promise<CurriculumData> {
    // Check cache first
    const now = Date.now()
    if (curriculumCache && (now - cacheTimestamp) < CACHE_DURATION) {
      return curriculumCache
    }

    try {
      console.log('🔄 Fetching curriculum data from Supabase Storage...')
      
      const [learningAreas, achievementStandards, crossCurriculumPriorities, generalCapabilities] = await Promise.all([
        this.fetchCurriculumData(CURRICULUM_URLS.learning_areas),
        this.fetchCurriculumData(CURRICULUM_URLS.achievement_standards),
        this.fetchCurriculumData(CURRICULUM_URLS.cross_curriculum_priorities),
        this.fetchCurriculumData(CURRICULUM_URLS.general_capabilities)
      ])

      const curriculumData: CurriculumData = {
        learning_areas: learningAreas,
        achievement_standards: achievementStandards,
        cross_curriculum_priorities: crossCurriculumPriorities,
        general_capabilities: generalCapabilities
      }

      // Cache the data
      curriculumCache = curriculumData
      cacheTimestamp = now

      console.log('✅ Curriculum data loaded successfully:', {
        learning_areas: learningAreas.length,
        achievement_standards: achievementStandards.length,
        cross_curriculum_priorities: crossCurriculumPriorities.length,
        general_capabilities: generalCapabilities.length
      })

      return curriculumData
    } catch (error) {
      console.error('❌ Error fetching curriculum data:', error)
      throw new Error('Failed to fetch curriculum data')
    }
  }

  /**
   * Fetch curriculum data from a specific URL
   */
  private static async fetchCurriculumData(url: string): Promise<CurriculumItem[]> {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      if (!Array.isArray(data)) {
        return []
      }
      
      // Ensure each item has an ID and filter out empty items
      return data
        .map((item: any, index: number) => ({
          ...item,
          id: item.id || `item-${Date.now()}-${index}`
        }))
        .filter((item: any) => {
          // Filter out items that don't have meaningful content
          const hasContent = item["Content Description"] || 
                           item["Achievement Standard"] || 
                           item["Description"]
          
          // Also filter out items that are just learning area headers without content
          const isJustHeader = item["Learning Area"] && 
                              !item["Content Description"] && 
                              !item["Achievement Standard"] && 
                              !item["Description"] &&
                              !item["Subject"]
          
          return hasContent && hasContent.trim() !== "" && !isJustHeader
        })
    } catch (error) {
      console.error(`❌ Error fetching from ${url}:`, error)
      return []
    }
  }

  /**
   * Get learning areas for a specific subject and level
   */
  static async getLearningAreas(subject?: string, level?: string): Promise<CurriculumItem[]> {
    const curriculumData = await this.fetchAllCurriculumData()
    let learningAreas = curriculumData.learning_areas

    if (subject) {
      learningAreas = learningAreas.filter(item => 
        (item["Subject"] || item.subject)?.toLowerCase().includes(subject.toLowerCase())
      )
    }

    if (level) {
      learningAreas = learningAreas.filter(item => 
        (item["Level"] || item.level)?.toLowerCase().includes(level.toLowerCase())
      )
    }

    return learningAreas
  }

  /**
   * Get achievement standards for a specific subject and level
   */
  static async getAchievementStandards(subject?: string, level?: string): Promise<CurriculumItem[]> {
    const curriculumData = await this.fetchAllCurriculumData()
    let standards = curriculumData.achievement_standards

    if (subject) {
      standards = standards.filter(item => 
        (item["Subject"] || item.subject)?.toLowerCase().includes(subject.toLowerCase())
      )
    }

    if (level) {
      standards = standards.filter(item => 
        (item["Level"] || item.level)?.toLowerCase().includes(level.toLowerCase())
      )
    }

    return standards
  }

  /**
   * Get cross-curriculum priorities
   */
  static async getCrossCurriculumPriorities(): Promise<CurriculumItem[]> {
    const curriculumData = await this.fetchAllCurriculumData()
    return curriculumData.cross_curriculum_priorities
  }

  /**
   * Get general capabilities
   */
  static async getGeneralCapabilities(): Promise<CurriculumItem[]> {
    const curriculumData = await this.fetchAllCurriculumData()
    return curriculumData.general_capabilities
  }

  /**
   * Search curriculum data by keyword
   */
  static async searchCurriculumData(keyword: string): Promise<{
    learning_areas: CurriculumItem[]
    achievement_standards: CurriculumItem[]
    cross_curriculum_priorities: CurriculumItem[]
    general_capabilities: CurriculumItem[]
  }> {
    const curriculumData = await this.fetchAllCurriculumData()
    const searchTerm = keyword.toLowerCase()

    const filterByKeyword = (items: CurriculumItem[]) => 
      items.filter(item => 
        (item["Content Description"] || item.content_description)?.toLowerCase().includes(searchTerm) ||
        (item["Achievement Standard"] || item.achievement_standard)?.toLowerCase().includes(searchTerm) ||
        (item["Description"] || item.description)?.toLowerCase().includes(searchTerm) ||
        (item["Learning Area"] || item.learning_area)?.toLowerCase().includes(searchTerm) ||
        (item["Subject"] || item.subject)?.toLowerCase().includes(searchTerm) ||
        (item["Level"] || item.level)?.toLowerCase().includes(searchTerm)
      )

    return {
      learning_areas: filterByKeyword(curriculumData.learning_areas),
      achievement_standards: filterByKeyword(curriculumData.achievement_standards),
      cross_curriculum_priorities: filterByKeyword(curriculumData.cross_curriculum_priorities),
      general_capabilities: filterByKeyword(curriculumData.general_capabilities)
    }
  }

  /**
   * Get unique subjects from learning areas
   */
  static async getSubjects(): Promise<string[]> {
    const curriculumData = await this.fetchAllCurriculumData()
    const subjects = new Set<string>()
    
    curriculumData.learning_areas.forEach(item => {
      const subject = item["Subject"] || item.subject
      if (subject && subject.trim() !== "") {
        subjects.add(subject)
      }
    })

    return Array.from(subjects).sort()
  }

  /**
   * Get subjects for a specific learning area
   */
  static async getSubjectsForLearningArea(learningArea: string): Promise<string[]> {
    const curriculumData = await this.fetchAllCurriculumData()
    const subjects = new Set<string>()
    
    curriculumData.learning_areas.forEach(item => {
      const itemLearningArea = item["Learning Area"] || item.learning_area
      const subject = item["Subject"] || item.subject
      
      if (itemLearningArea && itemLearningArea.toLowerCase() === learningArea.toLowerCase() && 
          subject && subject.trim() !== "") {
        subjects.add(subject)
      }
    })

    return Array.from(subjects).sort()
  }

  /**
   * Get subjects for a specific learning area and year level
   */
  static async getSubjectsForLearningAreaAndLevel(learningArea: string, yearLevel: string): Promise<string[]> {
    const curriculumData = await this.fetchAllCurriculumData()
    const subjects = new Set<string>()
    
    curriculumData.learning_areas.forEach(item => {
      const itemLearningArea = item["Learning Area"] || item.learning_area
      const itemLevel = item["Level"] || item.level
      const subject = item["Subject"] || item.subject
      
      if (itemLearningArea && itemLearningArea.toLowerCase() === learningArea.toLowerCase() &&
          itemLevel && itemLevel.toLowerCase() === yearLevel.toLowerCase() &&
          subject && subject.trim() !== "") {
        subjects.add(subject)
      }
    })

    return Array.from(subjects).sort()
  }

  /**
   * Get unique levels from learning areas
   */
  static async getLevels(): Promise<string[]> {
    const curriculumData = await this.fetchAllCurriculumData()
    const levels = new Set<string>()
    
    curriculumData.learning_areas.forEach(item => {
      const level = item["Level"] || item.level
      if (level && level.trim() !== "") {
        levels.add(level)
      }
    })

    // Custom sort for year levels
    const levelOrder = [
      "Foundation Year", "Foundation", "Year 1", "Year 2", "Year 3", "Year 4", 
      "Year 5", "Year 6", "Year 7", "Year 8", "Year 9", "Year 10", "Year 11", "Year 12"
    ]
    
    const sortedLevels = Array.from(levels).sort((a, b) => {
      const aIndex = levelOrder.indexOf(a)
      const bIndex = levelOrder.indexOf(b)
      
      // If both are in the order array, sort by their position
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex
      }
      
      // If only one is in the order array, prioritize it
      if (aIndex !== -1) return -1
      if (bIndex !== -1) return 1
      
      // If neither is in the order array, sort alphabetically
      return a.localeCompare(b)
    })

    return sortedLevels
  }

  /**
   * Get unique learning areas
   */
  static async getLearningAreaNames(): Promise<string[]> {
    const curriculumData = await this.fetchAllCurriculumData()
    const learningAreas = new Set<string>()
    
    curriculumData.learning_areas.forEach(item => {
      const learningArea = item["Learning Area"] || item.learning_area
      if (learningArea && learningArea.trim() !== "") {
        learningAreas.add(learningArea)
      }
    })

    return Array.from(learningAreas).sort()
  }

  /**
   * Get curriculum text for specific codes (for lesson plan generation)
   */
  static async getCurriculumTextByCodes(codes: string[]): Promise<Array<{
    code: string;
    description: string;
    achievementStandard?: string;
    strand?: string;
    subStrand?: string;
  }>> {
    const curriculumData = await this.fetchAllCurriculumData();
    const results = [];
    
    for (const code of codes) {
      // Search in learning areas first
      const learningAreaItem = curriculumData.learning_areas.find(item => 
        (item["Code"] || item.code) === code
      );
      
      if (learningAreaItem) {
        results.push({
          code,
          description: learningAreaItem["Content Description"] || learningAreaItem.content_description || `Content description for ${code}`,
          achievementStandard: learningAreaItem["Achievement Standard"] || learningAreaItem.achievement_standard,
          strand: learningAreaItem["Strand"] || learningAreaItem.strand,
          subStrand: learningAreaItem["Sub-Strand"] || learningAreaItem.sub_strand
        });
        continue;
      }
      
      // Search in achievement standards
      const achievementStandardItem = curriculumData.achievement_standards.find(item => 
        (item["Code"] || item.code) === code
      );
      
      if (achievementStandardItem) {
        results.push({
          code,
          description: achievementStandardItem["Description"] || achievementStandardItem.description || `Description for ${code}`,
          achievementStandard: achievementStandardItem["Achievement Standard"] || achievementStandardItem.achievement_standard
        });
        continue;
      }
      
      // If not found, create a placeholder
      results.push({
        code,
        description: `Official description text for ${code} from ACARA v9 curriculum.`,
        achievementStandard: `Relevant achievement standard snippet for ${code}.`
      });
    }
    
    return results;
  }

  /**
   * Search curriculum items by code (exact match)
   */
  static async searchByCode(code: string): Promise<CurriculumItem | null> {
    const curriculumData = await this.fetchAllCurriculumData();
    
    // Search in learning areas
    const learningAreaItem = curriculumData.learning_areas.find(item => 
      (item["Code"] || item.code) === code
    );
    
    if (learningAreaItem) {
      return learningAreaItem;
    }
    
    // Search in achievement standards
    const achievementStandardItem = curriculumData.achievement_standards.find(item => 
      (item["Code"] || item.code) === code
    );
    
    if (achievementStandardItem) {
      return achievementStandardItem;
    }
    
    return null;
  }

  /**
   * Get curriculum items for a specific subject and year level
   */
  static async getCurriculumItemsForSubjectAndLevel(subject: string, yearLevel: string): Promise<CurriculumItem[]> {
    const curriculumData = await this.fetchAllCurriculumData();
    
    console.log("Searching for subject:", subject, "year level:", yearLevel);
    console.log("Total learning areas:", curriculumData.learning_areas.length);
    
    // Get unique subjects and levels for debugging
    const uniqueSubjects = [...new Set(curriculumData.learning_areas.map(item => item["Subject"] || item.subject).filter(Boolean))];
    const uniqueLevels = [...new Set(curriculumData.learning_areas.map(item => item["Level"] || item.level).filter(Boolean))];
    console.log("Available subjects:", uniqueSubjects.slice(0, 10));
    console.log("Available levels:", uniqueLevels.slice(0, 10));
    
    const filtered = curriculumData.learning_areas.filter(item => {
      const itemSubject = item["Subject"] || item.subject;
      const itemLevel = item["Level"] || item.level;
      const hasCode = !!(item["Code"] || item.code);
      
      const subjectMatch = itemSubject?.toLowerCase().includes(subject.toLowerCase());
      const levelMatch = itemLevel?.toLowerCase().includes(yearLevel.toLowerCase());
      
      if (subjectMatch && levelMatch && hasCode) {
        console.log("Match found:", itemSubject, itemLevel, item["Code"] || item.code);
      }
      
      return subjectMatch && levelMatch && hasCode;
    });
    
    console.log("Filtered results:", filtered.length);
    return filtered;
  }

  /**
   * Clear the curriculum data cache
   */
  static clearCache(): void {
    curriculumCache = null
    cacheTimestamp = 0
  }
}
