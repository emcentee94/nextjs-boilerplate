'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, LibraryBig, CheckCircle2 } from 'lucide-react';

interface CurriculumItem {
  id?: string;
  code?: string;
  Code?: string;
  strand?: string;
  Strand?: string;
  sub_strand?: string;
  Sub_strand?: string;
  content_description?: string;
  'Content Description'?: string;
  achievement_standard?: string;
  'Achievement Standard'?: string;
  description?: string;
  Description?: string;
  elaboration?: string;
  Elaboration?: string;
  level?: string;
  Level?: string;
  subject?: string;
  Subject?: string;
}

interface CurriculumSelectorProps {
  curriculumItems: CurriculumItem[];
  selectedItems: CurriculumItem[];
  onSelectionChange: (items: CurriculumItem[]) => void;
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  subject: string; // From Lesson Basics
  year: string;    // From Lesson Basics
}

export default function CurriculumSelector({
  curriculumItems,
  selectedItems,
  onSelectionChange,
  isLoading,
  error,
  onRetry,
  subject,
  year
}: CurriculumSelectorProps) {
  const [view, setView] = useState<'browse' | 'search' | 'selected'>('browse');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<CurriculumItem[]>([]);

  // Search function
  const searchItems = (term: string) => {
    if (!term.trim()) return [];
    
    return curriculumItems.filter(item => {
      const searchFields = [
        item.code || item["Code"],
        item.content_description || item["Content Description"],
        item.achievement_standard || item["Achievement Standard"],
        item.strand || item["Strand"],
        item.sub_strand || item["Sub-strand"],
        item.elaboration || item["Elaboration"]
      ].filter(Boolean).join(' ').toLowerCase();
      
      return searchFields.includes(term.toLowerCase());
    });
  };

  // Get filtered items based on current view
  const getFilteredItems = () => {
    if (view === 'search') return searchResults;
    if (view === 'selected') return selectedItems;
    
    // Browse view - automatically filter by selected subject and year level
    let filtered = curriculumItems;
    
    // Auto-filter by subject and year level from lesson basics
    filtered = filtered.filter(item => {
      const itemSubject = item.subject || item["Subject"];
      const itemLevel = item.level || item["Level"];
      
      // Match subject (case-insensitive)
      const subjectMatch = !itemSubject || 
        itemSubject.toLowerCase().includes(subject.toLowerCase()) ||
        subject.toLowerCase().includes(itemSubject.toLowerCase());
      
      // Match year level (convert year number to level format)
      const yearMatch = !itemLevel || 
        itemLevel.toLowerCase().includes(year.toLowerCase()) ||
        year.toLowerCase().includes(itemLevel.toLowerCase());
      
      return subjectMatch && yearMatch;
    });
    
    return filtered;
  };

  // Handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim()) {
      setSearchResults(searchItems(term));
      setView('search');
    } else {
      setView('browse');
    }
  };

  // Toggle item selection
  const toggleItem = (item: CurriculumItem) => {
    const itemId = item.id || item.code || item["Code"];
    const isSelected = selectedItems.some(selected => 
      selected.id === itemId || selected.code === item.code || selected["Code"] === item["Code"]
    );

    if (isSelected) {
      onSelectionChange(selectedItems.filter(selected => 
        selected.id !== itemId && selected.code !== item.code && selected["Code"] !== item["Code"]
      ));
    } else {
      onSelectionChange([...selectedItems, { ...item, id: itemId }]);
    }
  };

  // Clear all selections
  const clearAll = () => {
    onSelectionChange([]);
  };

  // Select all visible
  const selectAllVisible = () => {
    const filtered = getFilteredItems();
    const newSelections = [...selectedItems];
    
    filtered.forEach(item => {
      const itemId = item.id || item.code || item["Code"];
      const isAlreadySelected = newSelections.some(selected => 
        selected.id === itemId || selected.code === item.code || selected["Code"] === item["Code"]
      );
      if (!isAlreadySelected) {
        newSelections.push({...item, id: itemId});
      }
    });
    
    onSelectionChange(newSelections);
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setView('browse')}
          className={`py-2 px-4 text-sm font-medium ${
            view === 'browse' ? 'border-b-2 border-[#333] text-[#333]' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Browse
        </button>
        <button
          onClick={() => setView('search')}
          className={`py-2 px-4 text-sm font-medium ${
            view === 'search' ? 'border-b-2 border-[#333] text-[#333]' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Search
        </button>
        <button
          onClick={() => setView('selected')}
          className={`py-2 px-4 text-sm font-medium ${
            view === 'selected' ? 'border-b-2 border-[#333] text-[#333]' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Selected ({selectedItems.length})
        </button>
      </div>

      {/* Content based on view */}
      {isLoading ? (
        <div className="mt-6 text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#333] mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading curriculum standards...</p>
        </div>
      ) : error ? (
        <div className="mt-6 p-4 bg-red-100 border border-red-300 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
          <button 
            onClick={onRetry}
            className="mt-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      ) : curriculumItems.length === 0 ? (
        <div className="mt-6 text-center py-8">
          <p className="text-gray-600">No curriculum standards found for {subject} Year {year}</p>
        </div>
      ) : (
        <>
          {/* Search Bar (always visible) */}
          <div className="relative">
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by code, description, or strand..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#333] focus:border-transparent"
            />
          </div>

          {/* Bulk Actions */}
          {filteredItems.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={selectAllVisible}
                className="px-3 py-2 bg-blue-100 text-blue-700 text-sm rounded-md hover:bg-blue-200 transition-colors"
              >
                Select All Visible ({filteredItems.length})
              </button>
              <button
                onClick={clearAll}
                className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200 transition-colors"
              >
                Clear All Selections ({selectedItems.length})
              </button>
            </div>
          )}

          {/* Results Summary */}
          <div className="flex justify-between items-center text-sm mb-4">
            <span className="text-gray-600">
              Showing {filteredItems.length} of {curriculumItems.length} standards
            </span>
            <span className="font-medium text-[#333]">
              {selectedItems.length} selected
            </span>
          </div>
          
          {/* Curriculum Standards Grid */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredItems.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No standards found matching your criteria.</p>
                {view === 'search' && (
                  <button
                    onClick={() => handleSearch('')}
                    className="mt-2 text-sm text-[#333] hover:underline"
                  >
                    Clear search
                  </button>
                )}
              </div>
            ) : (
              filteredItems.map((item, index) => {
                const itemId = item.id || item.code || item["Code"];
                const isSelected = selectedItems.some(selected => 
                  selected.id === itemId || selected.code === item.code || selected["Code"] === item["Code"]
                );
                const isAchievementStandard = item.achievement_standard || item["Achievement Standard"];
                const strand = item.strand || item["Strand"];
                const substrand = item.sub_strand || item["Sub-strand"];
                
                return (
                  <div
                    key={itemId}
                    onClick={() => toggleItem({...item, id: itemId})}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                      isSelected
                        ? 'border-[#333] bg-[#FDE5DA] shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        {/* Header with Code and Type */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs font-mono px-2 py-1 rounded ${
                            isAchievementStandard 
                              ? 'bg-purple-100 text-purple-700' 
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {item.code || item["Code"] || itemId}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            isAchievementStandard 
                              ? 'bg-purple-50 text-purple-600' 
                              : 'bg-blue-50 text-blue-600'
                          }`}>
                            {isAchievementStandard ? 'Achievement Standard' : 'Content Description'}
                          </span>
                          {strand && (
                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                              {strand}
                            </span>
                          )}
                          {substrand && (
                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                              {substrand}
                            </span>
                          )}
                        </div>

                        {/* Main Content */}
                        <h4 className="font-semibold text-sm mb-2 leading-relaxed">
                          {item.content_description || item["Content Description"] || 
                           item.achievement_standard || item["Achievement Standard"] || 
                           item.description || item["Description"] || 'Curriculum Standard'}
                        </h4>

                        {/* Elaboration */}
                        {(item.elaboration || item["Elaboration"]) && (
                          <p className="text-xs text-gray-600 mb-2 italic leading-relaxed">
                            {item.elaboration || item["Elaboration"]}
                          </p>
                        )}

                        {/* Level */}
                        {(item.level || item["Level"]) && (
                          <span className="text-xs text-green-600 font-medium">
                            Level: {item.level || item["Level"]}
                          </span>
                        )}
                      </div>

                      {/* Selection Checkbox */}
                      <div className={`ml-4 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? 'border-[#333] bg-[#333]'
                          : 'border-gray-300'
                      }`}>
                        {isSelected && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
}