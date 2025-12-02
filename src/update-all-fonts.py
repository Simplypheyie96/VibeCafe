import os
import re

def update_fonts_in_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace all Inter font references with Space Grotesk
        updated_content = content.replace("font-['Inter',sans-serif]", "font-['Space_Grotesk',sans-serif]")
        
        if content != updated_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(updated_content)
            print(f"Updated: {filepath}")
            return True
        return False
    except Exception as e:
        print(f"Error updating {filepath}: {e}")
        return False

def main():
    tsx_files = []
    for root, dirs, files in os.walk('.'):
        for file in files:
            if file.endswith('.tsx'):
                tsx_files.append(os.path.join(root, file))
    
    updated_count = 0
    for filepath in tsx_files:
        if update_fonts_in_file(filepath):
            updated_count += 1
    
    print(f"\nTotal files updated: {updated_count}/{len(tsx_files)}")

if __name__ == "__main__":
    main()
