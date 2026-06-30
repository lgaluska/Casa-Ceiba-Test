from pathlib import Path

from PIL import Image
from PIL import ImageFilter
from PIL import ImageOps
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

MB = 1024 * 1024

SUPPORTED_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".webp"
}

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
# Helper functions
# =====================================

def resize_keep_ratio(
    img: Image.Image,
    target_width: int
) -> Image.Image:
    """Resize image while preserving aspect ratio."""

    width, height = img.size

    if width <= target_width:
        return img.copy()

    ratio = target_width / width
    target_height = int(height * ratio)

    return img.resize(
        (target_width, target_height),
        Resampling.LANCZOS
    )


def file_size_mb(path: Path) -> float:
    """Return file size in MB."""

    return path.stat().st_size / MB


def print_header(title: str) -> None:
    """Print section header."""

    print()
    print("=" * 32)
    print(title)
    print("=" * 32)
    print()
    
# =====================================
# Main functions
# =====================================

def prepare_folders() -> None:
    """Create output folders if they do not exist."""

    WEB_DIR.mkdir(exist_ok=True)
    THUMB_DIR.mkdir(exist_ok=True)


def check_source_folder() -> None:
    """Verify that the source folder exists."""

    if SOURCE_DIR.exists():
        return

    print()
    print("ERROR: Folder 'original' not found.")
    input("\nPress ENTER to exit...")
    raise SystemExit


def get_source_names() -> set[str]:
    """Return all source filenames without extension."""

    return {
        file.stem
        for file in SOURCE_DIR.glob("*")
    }


def remove_obsolete_files(source_names: set[str]) -> None:
    """Delete obsolete images from output folders."""

    for folder in (WEB_DIR, THUMB_DIR):

        for file in folder.glob("*.webp"):

            if file.stem in source_names:
                continue

            print(f"DELETE   : {file.name}")
            file.unlink()


def get_source_files() -> list[Path]:
    """Return sorted list of source files."""

    return sorted(SOURCE_DIR.glob("*"))


def detect_category(filename: str) -> str:
    """Return gallery category according to filename prefix."""

    for prefix, category in CATEGORIES.items():

        if filename.lower().startswith(prefix):
            return category

    return "Other"
