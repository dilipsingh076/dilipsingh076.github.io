#!/bin/bash

# Favicon Generation Script for Dilip Singh Portfolio
# This script helps generate favicon files from the SVG logo

echo "🎨 Generating Favicon Files from Logo Component..."

# Check if ImageMagick is installed
if command -v convert &> /dev/null; then
    echo "✅ ImageMagick found. Generating PNG favicons..."
    
    # Generate PNG favicons
    convert public/favicon.svg -resize 16x16 public/favicon-16x16.png
    convert public/favicon.svg -resize 32x32 public/favicon-32x32.png
    
    echo "✅ PNG favicons generated successfully!"
else
    echo "⚠️  ImageMagick not found. Please install it or use online tools."
    echo "   Ubuntu/Debian: sudo apt-get install imagemagick"
    echo "   macOS: brew install imagemagick"
    echo "   Windows: Download from https://imagemagick.org/"
fi

# Check if we have the SVG favicon
if [ -f "public/favicon.svg" ]; then
    echo "✅ SVG favicon found at public/favicon.svg"
    echo "   This will work in modern browsers!"
else
    echo "❌ SVG favicon not found!"
fi

echo ""
echo "📋 Next Steps:"
echo "1. If you want an ICO file for older browsers:"
echo "   - Go to https://favicon.io/"
echo "   - Upload your favicon.svg"
echo "   - Download the generated favicon.ico"
echo "   - Place it in public/favicon.ico"
echo ""
echo "2. Test your favicon by refreshing your browser"
echo "3. Clear browser cache if needed"
echo ""
echo "🎯 Your custom logo favicon is now ready!"
