import os
import json

def sync_references(src_dir, mapping_file):
    with open(mapping_file, 'r') as f:
        mapping = json.load(f)
        
    # Sort mapping by key length descending to avoid partial replacements
    sorted_keys = sorted(mapping.keys(), key=len, reverse=True)
    
    for subdir, _, files in os.walk(src_dir):
        for file in files:
            file_path = os.path.join(subdir, file)
            
            # Skip non-code files
            if not file.endswith(('.tsx', '.ts', '.css', '.js', '.jsx')):
                continue
                
            with open(file_path, 'r') as f:
                content = f.read()
                
            original_content = content
            for old_rel in sorted_keys:
                new_rel = mapping[old_rel]
                
                # Check for various reference formats: "/path", '"path"', 'path'
                # The mapping has rel_old like "highlights/image.jpg"
                # We need to match it in strings like "/highlights/image.jpg"
                
                content = content.replace(f'/{old_rel}', f'/{new_rel}')
                content = content.replace(f'"{old_rel}"', f'"{new_rel}"')
                content = content.replace(f"'{old_rel}'", f"'{new_rel}'")
                
            if content != original_content:
                print(f"Updated: {os.path.relpath(file_path, src_dir)}")
                with open(file_path, 'w') as f:
                    f.write(content)

if __name__ == "__main__":
    src_dir = os.path.abspath('src')
    mapping_file = os.path.abspath('asset_mapping.json')
    sync_references(src_dir, mapping_file)
