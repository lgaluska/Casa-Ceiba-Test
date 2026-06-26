from pathlib import Path
from PIL import Image
from PIL import ImageOps
from PIL import ImageFilter
from PIL.Image import Resampling

# =====================================
# Settings
# =====================================

BASE_DIR = Path(__file__).resolve().parent

SOURCE_DIR = BASE_DIR / "original"
WEB_DIR = BASE_DIR / "web"
THUMB_DIR = BASE_DIR / "thumb"

GALLERY_FILE = BASE_DIR / "gallery.js"

WEB_WIDTH = 1600
THUMB_WIDTH = 600

WEB_QUALITY = 80
THUMB_QUALITY = 75

CATEGORIES = {
    "bedr": "Accommodation",
    "bath": "Bathroom",
    "kitc": "Kitchen",
    "outd": "Outdoor",
    "pool": "Pool",
    "surr": "Surroundings",
    "acti": "Activities"
}

CATEGORY_ORDER = [
    "Accommodation",
    "Bathroom",
    "Kitchen",
    "Outdoor",
    "Pool",
    "Surroundings",
    "Activities"
]

SPECIAL_FILES = {
    "CasaCeibaLogo",
    "favicon"
}

# =====================================
# Functions
# =====================================

def resize_keep_ratio(img, target_width):

    w, h = img.size

    if w <= target_width:
        return img.copy()

    ratio = target_width / w
    new_height = int(h * ratio)

    return img.resize(
        (target_width, new_height),
        Resampling.LANCZOS
    )


def file_size_mb(path):
    return path.stat().st_size / (
        1024 * 1024
    )


# =====================================
# Start
# =====================================

print()
print("================================")
print("Casa Ceiba Image Converter")
print("================================")
print()

print(f"Script directory : {BASE_DIR}")

if not SOURCE_DIR.exists():

    print()
    print("ERROR: Folder 'original' not found.")
    input("\nPress ENTER to exit...")
    raise SystemExit

WEB_DIR.mkdir(exist_ok=True)
THUMB_DIR.mkdir(exist_ok=True)

source_names = {
    f.stem
    for f
    in SOURCE_DIR.glob("*")
}

for folder in (
    WEB_DIR,
    THUMB_DIR
):

    for f in folder.glob("*.webp"):

        if f.stem not in source_names:

            print(
                f"DELETE   : {f.name}"
            )

            f.unlink()

files = sorted(SOURCE_DIR.glob("*"))

gallery_names = {}

converted = 0
skipped = 0

original_size = 0
web_size = 0
thumb_size = 0

print(f"Files found: {len(files)}")
print()

# =====================================
# Conversion
# =====================================

for file in files:

    if file.suffix.lower() not in (
        ".jpg",
        ".jpeg",
        ".png",
        ".webp"
    ):
        continue

    name = file.stem
    print(f"PROCESS  : {file.name}")
    category = "Other"
    
    if name in SPECIAL_FILES:
        print(
            f"SKIP     : {file.name}"
        )
        continue

    for prefix, title in CATEGORIES.items():

        if name.lower().startswith(prefix):
            category = title
            break

    gallery_names.setdefault(
        category,
        []
    ).append(name)

    web_file = (
        WEB_DIR /
        f"{file.stem}.webp"
    )

    thumb_file = (
        THUMB_DIR /
        f"{file.stem}.webp"
    )

    original_size += file_size_mb(file)

    if (
        web_file.exists()
        and
        thumb_file.exists()
    ):

        print(f"SKIP     : {file.name}")

        skipped += 1

        web_size += file_size_mb(web_file)
        thumb_size += file_size_mb(thumb_file)

        continue

    print(f"CONVERT  : {file.name}")

    try:

        with Image.open(file) as img:

            img = ImageOps.exif_transpose(img)
            img = img.convert("RGB")

            # WEB

            web_img = resize_keep_ratio(
                img,
                WEB_WIDTH
            )

            web_img = web_img.filter(
                ImageFilter.SHARPEN
            )

            web_img.save(
                web_file,
                "WEBP",
                quality=WEB_QUALITY,
                method=6
            )

            # THUMB

            thumb_img = resize_keep_ratio(
                img,
                THUMB_WIDTH
            )

            thumb_img = thumb_img.filter(
                ImageFilter.SHARPEN
            )

            thumb_img.save(
                thumb_file,
                "WEBP",
                quality=THUMB_QUALITY,
                method=6
            )

        converted += 1

        web_size += file_size_mb(web_file)
        thumb_size += file_size_mb(thumb_file)

        print("          -> OK")

    except Exception as e:

        print(
            f"          -> ERROR: {e}"
        )

# =====================================
# Create gallery.js
# =====================================

with open(
    GALLERY_FILE,
    "w",
    encoding="utf-8"
) as f:

    f.write(
        "const galleryImages = {\n"
    )

    ordered_categories = []

    for category in CATEGORY_ORDER:

        if category in gallery_names:
            ordered_categories.append(
                category
            )

    for category in gallery_names:

        if category not in ordered_categories:
            ordered_categories.append(
                category
            )

    for category in ordered_categories:

        f.write(
            f'    "{category}": [\n'
        )

        for name in sorted(
            gallery_names[category]
        ):

            f.write(
                f'        "{name}",\n'
            )

        f.write(
            "    ],\n"
        )

    f.write(
        "};\n"
    )

# =====================================
# Statistics
# =====================================

print()
print("================================")
print("Finished")
print("================================")
print()

print(f"Converted      : {converted}")
print(f"Skipped        : {skipped}")

print()

image_count = sum(
    len(images)
    for images
    in gallery_names.values()
)

print(
    f"gallery.js created "
    f"({image_count} images)"
)

print()

print(
    f"Original size  : "
    f"{original_size:.1f} MB"
)

print(
    f"Web size       : "
    f"{web_size:.1f} MB"
)

print(
    f"Thumb size     : "
    f"{thumb_size:.1f} MB"
)

print(
    f"Total output   : "
    f"{web_size + thumb_size:.1f} MB"
)

if original_size > 0:

    saving = (
        100
        * (
            1
            - (
                web_size
                + thumb_size
            )
            / original_size
        )
    )

    print(
        f"Size reduction : "
        f"{saving:.1f} %"
    )

print()
print("Done.")
input("\nPress ENTER to exit...")