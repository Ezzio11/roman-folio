import os
from PIL import Image
import json

def optimize_images(root_dir):
    mapping = {}
    total_saved = 0
    
    # Supported formats for conversion
    extensions = ('.png', '.jpg', '.jpeg')
    
    for subdir, _, files in os.walk(root_dir):
        for file in files:
            if file.lower().endswith(extensions):
                old_path = os.path.join(subdir, file)
                new_path = os.path.splitext(old_path)[0] + '.webp'
                
                # Relative paths for the mapping
                rel_old = os.path.relpath(old_path, root_dir)
                rel_new = os.path.relpath(new_path, root_dir)
                
                try:
                    with Image.open(old_path) as img:
                        # Special handling for depth maps or high-detail images if needed
                        quality = 85
                        if 'depth' in file.lower() or 'chief' in file.lower():
                            quality = 90
                            
                        # Save as WebP
                        img.save(new_path, 'WEBP', quality=quality, method=6)
                        
                        old_size = os.path.getsize(old_path)
                        new_size = os.path.getsize(new_path)
                        
                        if new_size < old_size:
                            print(f"Optimized: {rel_old} -> {rel_new} ({old_size/1024:.1f}KB -> {new_size/1024:.1f}KB)")
                            total_saved += (old_size - new_size)
                            mapping[rel_old] = rel_new
                            # Optional: remove old file if optimization was successful
                            # os.remove(old_path)
                        else:
                            print(f"Skipped (No gain): {rel_old}")
                            if os.path.exists(new_path):
                                os.remove(new_path)
                                
                except Exception as e:
                    print(f"Error processing {old_path}: {e}")
                    
    print(f"\nTotal Space Saved: {total_saved/1024/1024:.2f} MB")
    
    # Save the mapping for the codebase update script
    with open('asset_mapping.json', 'w') as f:
        json.dump(mapping, f, indent=2)

if __name__ == "__main__":
    public_dir = os.path.abspath('public')
    optimize_images(public_dir)
