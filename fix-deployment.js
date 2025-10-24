const fs = require('fs');
const path = require('path');

// Fix logo references to use logo.png
function fixLogoReferences() {
  const files = [
    'src/app/page.tsx',
    'src/app/resources/page.tsx',
    'src/app/browse/page.tsx',
    'src/app/dashboard/page.tsx'
  ];

  files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Fix logo references
      content = content.replace(/\/logo\.svg/g, '/logo.png');
      
      // Remove SourcekomAgent imports and usage
      content = content.replace(/import SourcekomAgent from ['"]@\/components\/agent\/SourcekomAgent['"];?\n?/g, '');
      content = content.replace(/\/\*\s*Sourcekom Agent\s*\*\/\s*\n\s*<SourcekomAgent \/>/g, '');
      content = content.replace(/<SourcekomAgent \/>/g, '');
      
      fs.writeFileSync(filePath, content);
      console.log(`Fixed ${file}`);
    }
  });
}

// Fix dashboard page Button imports
function fixDashboardImports() {
  const dashboardPath = path.join(__dirname, 'src/app/dashboard/page.tsx');
  if (fs.existsSync(dashboardPath)) {
    let content = fs.readFileSync(dashboardPath, 'utf8');
    
    // Ensure Button is imported
    if (!content.includes('import { Button }')) {
      content = content.replace(
        'import { Progress } from "@/components/ui/progress";',
        'import { Progress } from "@/components/ui/progress";\nimport { Button } from "@/components/ui/button";'
      );
    }
    
    fs.writeFileSync(dashboardPath, content);
    console.log('Fixed dashboard imports');
  }
}

// Fix browse page to use real API
function fixBrowsePage() {
  const browsePath = path.join(__dirname, 'src/app/browse/page.tsx');
  if (fs.existsSync(browsePath)) {
    let content = fs.readFileSync(browsePath, 'utf8');
    
    // Replace mock API with real API
    content = content.replace(
      /\/\/ Mock API call\s+await new Promise\(resolve => setTimeout\(resolve, 1000\)\)\s+const mockResources = \[[\s\S]*?\];\s+setResources\(mockResources\)/,
      'const response = await fetch(`/api/resources?search=${searchQuery}&category=${selectedCategory}&price=${selectedPriceRange}&sort=${sortBy}`)\n      if (response.ok) {\n        const data = await response.json()\n        setResources(data.resources || [])\n      } else {\n        setResources([])\n      }'
    );
    
    // Fix TypeScript types
    content = content.replace('const [resources, setResources] = useState([])', 'const [resources, setResources] = useState<any[]>([])');
    
    fs.writeFileSync(browsePath, content);
    console.log('Fixed browse page');
  }
}

// Execute fixes
fixLogoReferences();
fixDashboardImports();
fixBrowsePage();

console.log('All fixes applied successfully!');
