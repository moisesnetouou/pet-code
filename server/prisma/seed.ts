import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Criar clínica padrão
  const clinic = await prisma.clinic.upsert({
    where: { cnpj: "12.345.678/0001-90" },
    update: {},
    create: {
      name: "PetCode Clínica Veterinária",
      cnpj: "12.345.678/0001-90",
      phone: "(11) 99999-9999",
      email: "contato@petcode.com.br",
      address: "Rua Example, 123 - São Paulo, SP",
    },
  });
  console.log("✅ Clinic created:", clinic.name);

  // Criar usuário admin
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@petcode.com.br" },
    update: {},
    create: {
      email: "admin@petcode.com.br",
      passwordHash: adminPassword,
      name: "Administrador",
      role: "ADMIN",
      clinicId: clinic.id,
    },
  });
  console.log("✅ Admin user created:", admin.email);

  // Criar usuário veterinário
  const vetPassword = await bcrypt.hash("vet123", 10);
  const vet = await prisma.user.upsert({
    where: { email: "vet@petcode.com.br" },
    update: {},
    create: {
      email: "vet@petcode.com.br",
      passwordHash: vetPassword,
      name: "Dr. Veterinário",
      role: "VETERINARIO",
      clinicId: clinic.id,
    },
  });
  console.log("✅ Vet user created:", vet.email);

  // Criar tutor de exemplo
  const tutor = await prisma.tutor.upsert({
    where: { cpf: "123.456.789-00" },
    update: {},
    create: {
      name: "João Silva",
      cpf: "123.456.789-00",
      phone: "(11) 98888-8888",
      email: "joao@email.com",
      address: "Rua das Flores, 456 - São Paulo, SP",
    },
  });
  console.log("✅ Tutor created:", tutor.name);

  // Criar pet de exemplo
  const pet = await prisma.pet.upsert({
    where: { id: "00000000-0000-0000-0000-000000000001" },
    update: {},
    create: {
      name: "Rex",
      type: "CACHORRO",
      breed: "Labrador",
      birthDate: new Date("2020-05-15"),
      gender: "Macho",
      weight: 25.5,
      color: "Amarelo",
      clinicId: clinic.id,
      tutorId: tutor.id,
    },
  });
  console.log("✅ Pet created:", pet.name);

  console.log("\n🎉 Seed completed!");
  console.log("\n📝 Login credentials:");
  console.log("   Admin: admin@petcode.com.br / admin123");
  console.log("   Vet:   vet@petcode.com.br / vet123");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
