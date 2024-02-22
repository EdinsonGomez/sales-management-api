const prisma = require("../src/db");
const products = require("./products");
const roles = require("./roles");

async function main() {
  await prisma.products.createMany({
    data: products
  });

  await prisma.roles.createMany({ data: roles });

  const [adminRol, employeeRol, everyoneRol] = await Promise.all([
    prisma.roles.findUnique({ where: { name: 'admin' }}),
    prisma.roles.findUnique({ where: { name: 'employee' }}),
  ]);

  await prisma.users.createMany({ data: [
    {
      name: 'admin-user',
      last_name: 'test',
      document: '123456',
      rol_id: adminRol.id
    },
    {
      name: 'employee-user',
      last_name: 'test',
      document: '78945',
      rol_id: employeeRol.id,
    },
  ]});
}

main()
  .then(async () => {
    console.log('data saved');
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error('Error seed db: ', error);
    await prisma.$disconnect();

    process.exit(1);
  })