const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create directories for each domain
const domains = ['technology', 'business', 'science'];
const terms = {
  technology: [
    'algorithm', 'api', 'cloud-computing', 'database', 'encryption',
    'firewall', 'interface', 'protocol', 'server', 'virtualization'
  ],
  business: [
    'roi', 'kpi', 'marketing', 'strategy', 'leadership',
    'innovation', 'management', 'entrepreneurship', 'finance', 'branding'
  ],
  science: [
    'hypothesis', 'experiment', 'theory', 'research', 'analysis',
    'observation', 'methodology', 'data', 'conclusion', 'evidence'
  ]
};

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}

function drawRandomShapes(ctx, width, height) {
  const shapeCount = 5 + Math.floor(Math.random() * 6); // 5-10 shapes
  for (let i = 0; i < shapeCount; i++) {
    ctx.save();
    ctx.globalAlpha = 0.2 + Math.random() * 0.5;
    ctx.fillStyle = randomColor();
    ctx.strokeStyle = randomColor();
    const shapeType = Math.floor(Math.random() * 3);
    if (shapeType === 0) {
      // Circle
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = 30 + Math.random() * 100;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fill();
    } else if (shapeType === 1) {
      // Rectangle
      const x = Math.random() * width;
      const y = Math.random() * height;
      const w = 40 + Math.random() * 120;
      const h = 40 + Math.random() * 120;
      ctx.fillRect(x, y, w, h);
    } else {
      // Line
      ctx.lineWidth = 2 + Math.random() * 8;
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.lineTo(Math.random() * width, Math.random() * height);
      ctx.stroke();
    }
    ctx.restore();
  }
}

// Function to generate a placeholder image
function generatePlaceholderImage(term, index) {
  const width = 800;
  const height = 600;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Random background
  ctx.fillStyle = randomColor();
  ctx.fillRect(0, 0, width, height);

  // Draw random shapes
  drawRandomShapes(ctx, width, height);

  // Add term text in random color and position
  ctx.save();
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = randomColor();
  const textX = width / 2 + (Math.random() - 0.5) * 200;
  const textY = height / 2 + (Math.random() - 0.5) * 200;
  ctx.fillText(term.toUpperCase(), textX, textY);
  ctx.restore();

  // Add index text
  ctx.save();
  ctx.font = '24px Arial';
  ctx.fillStyle = randomColor();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`Image ${index + 1}`, width / 2, height - 40);
  ctx.restore();

  // Add border
  ctx.save();
  ctx.strokeStyle = randomColor();
  ctx.lineWidth = 4;
  ctx.strokeRect(0, 0, width, height);
  ctx.restore();

  return canvas.toBuffer('image/png');
}

// Function to save images for a term
async function saveImagesForTerm(domain, term) {
  const dir = path.join('public', 'images', domain, term);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Generate and save 5 images
  for (let i = 0; i < 5; i++) {
    const imageBuffer = generatePlaceholderImage(term, i);
    const filePath = path.join(dir, `image${i + 1}.png`);
    fs.writeFileSync(filePath, imageBuffer);
    console.log(`Generated image ${i + 1} for ${term}`);
  }
}

// Main function
async function main() {
  // Create base directories
  for (const domain of domains) {
    const domainDir = path.join('public', 'images', domain);
    if (!fs.existsSync(domainDir)) {
      fs.mkdirSync(domainDir, { recursive: true });
    }
  }

  // Generate images for each term
  for (const [domain, domainTerms] of Object.entries(terms)) {
    for (const term of domainTerms) {
      console.log(`Generating images for ${term}...`);
      await saveImagesForTerm(domain, term);
    }
  }
}

main().catch(console.error); 