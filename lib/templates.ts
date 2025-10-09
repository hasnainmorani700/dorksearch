export interface DorkTemplate {
  id: string;
  name: string;
  description: string;
  placeholder: string;
  fields: Array<'filetype' | 'site'>;
  generate: (params: { query: string; filetype: string; site: string }) => string;
}

export interface CustomDorkTemplateData {
  id: string;
  name: string;
  description: string;
  placeholder: string;
  template: string;
  fields: Array<'filetype' | 'site'>;
}

export const DORK_TEMPLATES: DorkTemplate[] = [
  {
    id: 'open-directory',
    name: 'Open Directory Search',
    description: 'Finds open directories containing specific files or keywords.',
    placeholder: 'e.g., interstellar.mkv or linux_distro.iso',
    fields: ['filetype', 'site'],
    generate: ({ query, filetype, site }) => {
      if (!query) return '';
      const parts = [`intitle:"index of" "${query}"`];
      if (filetype) parts.push(`filetype:${filetype}`);
      if (site) parts.push(`site:${site}`);
      parts.push(
        '-inurl:(jsp|pl|php|html|aspx|htm|cf|shtml)',
        '-inurl:(listen77|mp3raid|mp3toss|mp3drug|index_of|index-of|wallywashis|downloadmana)'
      );
      return parts.join(' ');
    },
  },
  {
    id: 'filetype-specific',
    name: 'Filetype Specific Search',
    description: 'Focuses the search on a particular filetype (e.g., pdf, docx).',
    placeholder: 'Keyword (optional)',
    fields: ['filetype', 'site'],
    generate: ({ query, filetype, site }) => {
      if (!filetype) return ''; // Requires filetype
      const parts = [];
      if (query) parts.push(`"${query}"`);
      parts.push(`filetype:${filetype}`);
      if (site) parts.push(`site:${site}`);
      return parts.join(' ');
    },
  },
  {
    id: 'intitle-specific',
    name: 'In-Title Search',
    description: 'Searches for keywords specifically in page titles.',
    placeholder: "e.g., 'Company Annual Report'",
    fields: ['site'],
    generate: ({ query, site }) => {
      if (!query) return ''; // Requires query
      const parts = [`intitle:"${query}"`];
      if (site) parts.push(`site:${site}`);
      return parts.join(' ');
    },
  },
];

export const convertCustomToDorkTemplate = (data: CustomDorkTemplateData): DorkTemplate => {
  return {
    ...data,
    generate: ({ query, filetype, site }) => {
      let result = data.template;
      result = result.replace('{query}', query ? `"${query}"` : '');
      result = result.replace('{filetype}', filetype ? `filetype:${filetype}` : '');
      result = result.replace('{site}', site ? `site:${site}` : '');
      return result.replace(/\s+/g, ' ').trim();
    }
  }
};