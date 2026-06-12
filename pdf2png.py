"""Render PDF pages to PNGs for vision extraction. Usage: pdf2png.py <pdf> <outdir> [maxpages]"""
import sys, os
import pypdfium2 as pdfium

pdf_path, outdir = sys.argv[1], sys.argv[2]
maxpages = int(sys.argv[3]) if len(sys.argv) > 3 else 999
os.makedirs(outdir, exist_ok=True)
doc = pdfium.PdfDocument(pdf_path)
n = min(len(doc), maxpages)
base = os.path.splitext(os.path.basename(pdf_path))[0].replace(" ", "_")
paths = []
for i in range(n):
    page = doc[i]
    bmp = page.render(scale=2.0)  # ~144 dpi
    img = bmp.to_pil()
    # downscale if huge to keep tokens reasonable
    if img.width > 1400:
        ratio = 1400 / img.width
        img = img.resize((1400, int(img.height * ratio)))
    out = os.path.join(outdir, f"{base}_p{i+1}.png")
    img.save(out)
    paths.append(out)
print(f"{n} pages -> {outdir}")
for p in paths:
    print(p)
