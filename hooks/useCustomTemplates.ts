import { useState, useEffect, useCallback } from 'react';
import { CustomDorkTemplateData } from '../lib/templates';

const STORAGE_KEY = 'customDorkTemplates';

export const useCustomTemplates = () => {
  const [customTemplates, setCustomTemplates] = useState<CustomDorkTemplateData[]>([]);

  useEffect(() => {
    try {
      const storedItems = localStorage.getItem(STORAGE_KEY);
      if (storedItems) {
        setCustomTemplates(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error("Failed to parse custom templates from localStorage", error);
    }
  }, []);

  const saveTemplates = (templates: CustomDorkTemplateData[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
      setCustomTemplates(templates);
    } catch (error) {
        console.error("Failed to save custom templates to localStorage", error);
    }
  };

  const addTemplate = useCallback((template: Omit<CustomDorkTemplateData, 'id'>) => {
    const newTemplate = { ...template, id: `custom-${Date.now()}` };
    const updatedTemplates = [...customTemplates, newTemplate];
    saveTemplates(updatedTemplates);
  }, [customTemplates]);

  const deleteTemplate = useCallback((id: string) => {
    const updatedTemplates = customTemplates.filter(t => t.id !== id);
    saveTemplates(updatedTemplates);
  }, [customTemplates]);

  return { customTemplates, addTemplate, deleteTemplate };
};
