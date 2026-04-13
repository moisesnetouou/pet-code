import { existsSync } from "fs";
import { unlink, writeFile } from "fs/promises";
import { type NextRequest, NextResponse } from "next/server";
import { join } from "path";

export const dynamic = "force-dynamic";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024;

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Nenhuma imagem enviada" },
        { status: 400 },
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Tipo de arquivo não permitido. Use JPG, PNG ou WebP" },
        { status: 400 },
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Arquivo muito grande. Máximo 5MB" },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const extension = file.type.split("/")[1];
    const fileName = `${id}.${extension}`;
    const uploadDir = join(process.cwd(), "public", "uploads", "pets");
    const filePath = join(uploadDir, fileName);

    if (existsSync(filePath)) {
      await unlink(filePath);
    }

    await writeFile(filePath, buffer);

    const photoUrl = `/uploads/pets/${fileName}`;

    return NextResponse.json({ photoUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Erro ao processar upload" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const url = new URL(request.url);
    const extension = url.searchParams.get("ext");

    if (!extension) {
      return NextResponse.json(
        { error: "Extensão necessária" },
        { status: 400 },
      );
    }

    const fileName = `${id}.${extension}`;
    const filePath = join(process.cwd(), "public", "uploads", "pets", fileName);

    if (existsSync(filePath)) {
      await unlink(filePath);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Erro ao excluir foto" },
      { status: 500 },
    );
  }
}
