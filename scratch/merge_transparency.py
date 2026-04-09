from PIL import Image
import os

def merge_transparency(portrait_path, mask_path, output_path):
    print(f"Opening portrait: {portrait_path}")
    portrait = Image.open(portrait_path).convert("RGB")
    
    print(f"Opening mask: {mask_path}")
    mask = Image.open(mask_path).convert("L")
    
    # Ensure they are the same size
    if portrait.size != mask.size:
        print(f"Resizing mask from {mask.size} to {portrait.size}")
        mask = mask.resize(portrait.size, Image.Resampling.LANCZOS)
    
    # Apply mask as alpha channel
    print("Applying mask as alpha channel...")
    portrait.putalpha(mask)
    
    # Save as RGBA PNG
    print(f"Saving final result to: {output_path}")
    portrait.save(output_path, "PNG")
    print("Merge complete!")

if __name__ == "__main__":
    # Absolute paths for safety
    BASE_DIR = r"c:\Users\josue\Desktop\profile\my-profile"
    PORTRAIT = os.path.join(BASE_DIR, "public", "hero-portrait-new.png")
    MASK = os.path.join(BASE_DIR, "public", "hero-mask.png")
    OUTPUT = os.path.join(BASE_DIR, "public", "hero-portrait-final.png")
    
    merge_transparency(PORTRAIT, MASK, OUTPUT)
