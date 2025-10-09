import React, { useState } from 'react';
import { CustomDorkTemplateData } from '../lib/templates';
import { TrashIcon } from './icons/TrashIcon';
import { PlusIcon } from './icons/PlusIcon';

interface TemplateManagerProps {
  isOpen: boolean;
  onClose: () => void;
  customTemplates: CustomDorkTemplateData[];
  addTemplate: (template: Omit<CustomDorkTemplateData, 'id'>) => void;
  deleteTemplate: (id: string) => void;
}

const TemplateManager: React.FC<TemplateManagerProps> = ({
  isOpen,
  onClose,
  customTemplates,
  addTemplate,
  deleteTemplate,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [template, setTemplate] = useState('');
  const [fields, setFields] = useState<Array<'filetype' | 'site'>>([]);

  if (!isOpen) return null;

  const handleFieldChange = (field: 'filetype' | 'site') => {
    setFields(prev =>
      prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !template) {
        alert("Template Name and Dork String are required.");
        return;
    };
    addTemplate({ name, description, placeholder, template, fields });
    // Reset form
    setName('');
    setDescription('');
    setPlaceholder('');
    setTemplate('');
    setFields([]);
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-4 border-b border-slate-700 flex justify-between items-center flex-shrink-0">
          <h2 className="text-lg font-semibold text-white">Manage Custom Templates</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">&times;</button>
        </header>

        <div className="p-6 overflow-y-auto space-y-8">
          {/* Create New Template Form */}
          <section>
            <h3 className="text-md font-semibold text-cyan-400 mb-4 flex items-center gap-2"><PlusIcon className="w-5 h-5"/>Create New Template</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Template Name*" value={name} onChange={e => setName(e.target.value)} className="input-style" required/>
                <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="input-style"/>
              </div>
              <input type="text" placeholder="Input Placeholder (e.g., movie title)" value={placeholder} onChange={e => setPlaceholder(e.target.value)} className="input-style"/>
              <textarea placeholder="Dork String* (e.g., intitle:&#34;index of&#34; {query} {filetype})" value={template} onChange={e => setTemplate(e.target.value)} className="input-style font-mono h-24" required/>
              <p className="text-xs text-slate-500 -mt-2 ml-1">Use <code className="bg-slate-700 px-1 rounded">{'{query}'}</code>, <code className="bg-slate-700 px-1 rounded">{'{filetype}'}</code>, and <code className="bg-slate-700 px-1 rounded">{'{site}'}</code> as placeholders.</p>
              
              <div className="flex items-center gap-6 pt-2">
                 <p className="text-sm font-medium text-slate-300">Show optional fields:</p>
                 <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={fields.includes('filetype')} onChange={() => handleFieldChange('filetype')} className="form-checkbox bg-slate-700 border-slate-600 rounded text-cyan-500 focus:ring-cyan-600"/>
                    Filetype
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={fields.includes('site')} onChange={() => handleFieldChange('site')} className="form-checkbox bg-slate-700 border-slate-600 rounded text-cyan-500 focus:ring-cyan-600"/>
                    Site
                 </label>
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300">
                Add Template
              </button>
            </form>
          </section>

          {/* Existing Custom Templates */}
          <section>
            <h3 className="text-md font-semibold text-cyan-400 mb-4 border-t border-slate-700 pt-6">Your Templates</h3>
            <div className="space-y-3">
              {customTemplates.length > 0 ? (
                customTemplates.map(t => (
                  <div key={t.id} className="bg-slate-900 p-3 rounded-lg flex justify-between items-center">
                    <div>
                        <p className="font-medium text-slate-200">{t.name}</p>
                        <p className="text-xs text-slate-400">{t.description}</p>
                    </div>
                    <button onClick={() => deleteTemplate(t.id)} className="p-2 text-slate-500 hover:text-red-400 transition-colors">
                      <TrashIcon className="w-5 h-5"/>
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-center py-4">You haven't created any custom templates yet.</p>
              )}
            </div>
          </section>
        </div>
      </div>
      <style>{`
        .input-style {
            width: 100%;
            background-color: #0f172a; /* slate-900 */
            border: 1px solid #334155; /* slate-700 */
            color: #e2e8f0; /* slate-200 */
            placeholder-color: #64748b; /* slate-500 */
            border-radius: 0.5rem;
            padding: 0.75rem 1rem;
            transition: all 0.3s;
        }
        .input-style:focus {
            outline: none;
            box-shadow: 0 0 0 2px #06b6d4; /* ring-cyan-500 */
            border-color: #06b6d4; /* border-cyan-500 */
        }
        .form-checkbox {
            height: 1.1rem;
            width: 1.1rem;
        }
      `}</style>
    </div>
  );
};

export default TemplateManager;