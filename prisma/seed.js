import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create Users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        fullname: 'Ari Eka Saputra',
        email: 'ari@example.com',
        password: 'password123',
        role: 'user',
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        fullname: 'Rina Putri',
        email: 'rina@example.com',
        password: 'password123',
        role: 'user',
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        fullname: 'Budi Santoso',
        email: 'budi@example.com',
        password: 'password123',
        role: 'user',
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        fullname: 'Siti Aminah',
        email: 'siti@example.com',
        password: 'password123',
        role: 'user',
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        fullname: 'Andi Wijaya',
        email: 'andi@example.com',
        password: 'password123',
        role: 'admin',
        isActive: true,
      },
    }),
  ]);
  console.log('Created users');

  // Create Profiles
  await Promise.all([
    prisma.profile.create({
      data: {
        pic: 'https://i.pravatar.cc/150?img=1',
        phone: '081234567890',
        address: 'Jl. Merdeka 1, Jakarta',
        userId: users[0].id,
      },
    }),
    prisma.profile.create({
      data: {
        pic: 'https://i.pravatar.cc/150?img=2',
        phone: '081234567891',
        address: 'Jl. Sudirman 2, Jakarta',
        userId: users[1].id,
      },
    }),
    prisma.profile.create({
      data: {
        pic: 'https://i.pravatar.cc/150?img=3',
        phone: '081234567892',
        address: 'Jl. Thamrin 3, Jakarta',
        userId: users[2].id,
      },
    }),
    prisma.profile.create({
      data: {
        pic: 'https://i.pravatar.cc/150?img=4',
        phone: '081234567893',
        address: 'Jl. Gatot Subroto 4, Jakarta',
        userId: users[3].id,
      },
    }),
    prisma.profile.create({
      data: {
        pic: 'https://i.pravatar.cc/150?img=5',
        phone: '081234567894',
        address: 'Jl. Diponegoro 5, Jakarta',
        userId: users[4].id,
      },
    }),
  ]);
  console.log('Created profiles');

  // Create Categories
  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'Kopi Single Origin' } }),
    prisma.category.create({ data: { name: 'Kopi House Blend' } }),
    prisma.category.create({ data: { name: 'Kopi Ready to Drink' } }),
    prisma.category.create({ data: { name: 'Coffee Based Drinks' } }),
    prisma.category.create({ data: { name: 'Non Coffee Drinks' } }),
    prisma.category.create({ data: { name: 'Pastry & Bakery' } }),
    prisma.category.create({ data: { name: 'Snacks & Meals' } }),
  ]);
  console.log('Created categories');

  // Create Carts
  const carts = await Promise.all(
    users.map((user) =>
      prisma.cart.create({
        data: {
          quantity: 0,
          userId: user.id,
        },
      })
    )
  );
  console.log('Created carts');

  // Create Products
  const productData = [
    // Kopi Single Origin
    { name: 'Kopi Arabica Aceh Gayo', price: 58000, description: 'Arabica premium dengan aroma fruity.', stock: 120, isFavorite: true, categoryId: categories[0].id, image: 'https://i.pinimg.com/736x/f0/65/5f/f0655f2737da76be9b4ac435c65e3d9b.jpg' },
    { name: 'Kopi Robusta Temanggung', price: 42000, description: 'Robusta strong dengan aroma tembakau.', stock: 150, categoryId: categories[0].id, image: 'https://i.pinimg.com/736x/d5/2e/4e/d52e4e807352c3421ed89d95ddee75a2.jpg' },
    { name: 'Kopi Arabica Bali Kintamani', price: 63000, description: 'Rasa citrus segar dan floral.', stock: 100, isFavorite: true, categoryId: categories[0].id, image: 'https://i.pinimg.com/736x/d5/2e/4e/d52e4e807352c3421ed89d95ddee75a2.jpg' },
    { name: 'Kopi Liberica Jambi Kerinci', price: 59000, description: 'Aroma smoky dan chocolaty.', stock: 80, categoryId: categories[0].id, image: 'https://i.pinimg.com/1200x/bf/b4/06/bfb406dd39f9c26b98c0da7b98dadc50.jpg' },
    
    // Kopi House Blend
    { name: 'House Blend Premium 70% Arabica', price: 52000, description: 'Campuran Arabica dan Robusta.', stock: 140, isFavorite: true, categoryId: categories[1].id, image: 'https://i.pinimg.com/736x/4d/e0/68/4de068124212961d6481e6c631774053.jpg' },
    { name: 'House Blend Strong', price: 48000, description: 'Blend special rasa strong dan bold.', stock: 130, categoryId: categories[1].id, image: 'https://i.pinimg.com/1200x/f3/35/3d/f3353da22218a4de90629ea801d6d0ff.jpg' },
    
    // Kopi Ready to Drink
    { name: 'Signature Cold Brew 250ml', price: 26000, description: 'Cold brew smooth.', stock: 70, isFlashsale: true, isFavorite: true, categoryId: categories[2].id, image: 'https://i.pinimg.com/1200x/f3/35/3d/f3353da22218a4de90629ea801d6d0ff.jpg' },
    { name: 'Cold Brew Vanilla 250ml', price: 28000, description: 'Cold brew dengan sentuhan vanilla.', stock: 60, categoryId: categories[2].id, image: 'https://i.pinimg.com/1200x/c2/fb/ae/c2fbaea43bd393464e76b3f817264e8e.jpg' },
    { name: 'Kopi Susu Gula Aren', price: 29000, description: 'Kopi susu kekinian gula aren.', stock: 60, isFlashsale: true, isFavorite: true, categoryId: categories[2].id, image: 'https://i.pinimg.com/1200x/45/26/0f/45260f2948ebd7666a72ec668b64aec0.jpg' },
    { name: 'Kopi Susu Caramel', price: 30000, description: 'Kopi susu dengan caramel manis.', stock: 55, categoryId: categories[2].id, image: 'https://i.pinimg.com/736x/23/bb/22/23bb2225da3229b4f3b85f0968a0e2c0.jpg' },
    
    // Coffee Based Drinks
    { name: 'Hazelnut Latte', price: 34000, description: 'Latte creamy dengan hazelnut.', stock: 75, isFavorite: true, categoryId: categories[3].id, image: 'https://i.pinimg.com/736x/e5/9d/e6/e59de61513e3543bdf3f46b3c18459be.jpg' },
    { name: 'Caramel Macchiato', price: 36000, description: 'Espresso, susu, caramel.', stock: 65, isFavorite: true, categoryId: categories[3].id, image: 'https://i.pinimg.com/736x/0b/e7/b8/0be7b87d66b4d16ec60455d1d81abbe8.jpg' },
    { name: 'Cappuccino Hot Cup', price: 30000, description: 'Cappuccino foam tebal.', stock: 90, categoryId: categories[3].id, image: 'https://i.pinimg.com/736x/95/67/1b/95671b9bb292a423175d3c39fa87d1ab.jpg' },
    { name: 'Americano Hot', price: 24000, description: 'Espresso + air panas.', stock: 110, categoryId: categories[3].id, image: 'https://i.pinimg.com/736x/e9/a6/9b/e9a69b322c3fdec10b5448e4616095d3.jpg' },
    { name: 'Americano Iced', price: 26000, description: 'Americano dingin segar.', stock: 95, categoryId: categories[3].id, image: 'https://i.pinimg.com/1200x/c9/f0/14/c9f014e078ff2fa631afdba375d13eb1.jpg' },
    { name: 'Espresso Double Shot', price: 20000, description: '2 shot espresso.', stock: 85, categoryId: categories[3].id, image: 'https://i.pinimg.com/1200x/c9/f0/14/c9f014e078ff2fa631afdba375d13eb1.jpg' },
    { name: 'Mocha Latte', price: 33000, description: 'Perpaduan kopi dan cokelat.', stock: 70, isFavorite: true, categoryId: categories[3].id, image: 'https://i.pinimg.com/736x/47/b1/46/47b146260ecbc447bff9e15f06482227.jpg' },
    
    // Non Coffee Drinks
    { name: 'Matcha Latte Premium', price: 33000, description: 'Matcha Jepang premium.', stock: 70, isFavorite: true, categoryId: categories[4].id, image: 'https://i.pinimg.com/1200x/a0/98/38/a09838a5c2e586154183b892e3d187e1.jpg' },
    { name: 'Matcha Frappe', price: 35000, description: 'Matcha blend dingin.', stock: 60, categoryId: categories[4].id, image: 'https://i.pinimg.com/736x/3a/79/af/3a79af9ece5d0794921a69a2845896f2.jpg' },
    { name: 'Chocolate Frappe', price: 35000, description: 'Frappe cokelat pekat.', stock: 80, isFavorite: true, categoryId: categories[4].id, image: 'https://i.pinimg.com/736x/3a/79/af/3a79af9ece5d0794921a69a2845896f2.jpg' },
    { name: 'Vanilla Milkshake', price: 32000, description: 'Milkshake vanilla bean.', stock: 50, categoryId: categories[4].id, image: 'https://i.pinimg.com/736x/3a/79/af/3a79af9ece5d0794921a69a2845896f2.jpg' },
    { name: 'Strawberry Milkshake', price: 33000, description: 'Milkshake strawberry segar.', stock: 45, categoryId: categories[4].id, image: 'https://i.pinimg.com/736x/ab/f9/ca/abf9caa52dc817a4563e70ed9ef006fc.jpg' },
    { name: 'Taro Latte', price: 30000, description: 'Minuman taro creamy.', stock: 60, isFavorite: true, categoryId: categories[4].id, image: 'https://i.pinimg.com/736x/ab/f9/ca/abf9caa52dc817a4563e70ed9ef006fc.jpg' },
    { name: 'Thai Tea Original', price: 25000, description: 'Thai tea manis creamy.', stock: 100, categoryId: categories[4].id, image: 'https://i.pinimg.com/736x/7c/af/e9/7cafe93e17792d26f12919260b380f2a.jpg' },
    { name: 'Lemon Tea Iced', price: 22000, description: 'Teh lemon segar.', stock: 120, categoryId: categories[4].id, image: 'https://i.pinimg.com/736x/7c/af/e9/7cafe93e17792d26f12919260b380f2a.jpg' },
    { name: 'Green Tea Latte', price: 31000, description: 'Green tea creamy.', stock: 70, isFavorite: true, categoryId: categories[4].id, image: 'https://i.pinimg.com/1200x/23/61/ce/2361ceb86d999535b293f925484798b4.jpg' },
    
    // Pastry & Bakery
    { name: 'Croissant Butter', price: 18000, description: 'Croissant buttery flaky.', stock: 90, isFavorite: true, categoryId: categories[5].id, image: 'https://i.pinimg.com/1200x/23/61/ce/2361ceb86d999535b293f925484798b4.jpg' },
    { name: 'Almond Croissant', price: 22000, description: 'Croissant isi almond.', stock: 70, categoryId: categories[5].id, image: 'https://i.pinimg.com/1200x/48/12/a2/4812a2116fe356d79883b6ff656a3d0e.jpg' },
    { name: 'Donat Cokelat Classic', price: 12000, description: 'Donat topping cokelat.', stock: 100, categoryId: categories[5].id, image: 'https://i.pinimg.com/1200x/38/e5/75/38e5753a5c85421b4dd7ca3ccfc489fd.jpg' },
    { name: 'Donat Gula Halus', price: 10000, description: 'Donat klasik tabur gula.', stock: 110, categoryId: categories[5].id, image: 'https://i.pinimg.com/736x/ef/88/0a/ef880a1e7acdcec049e00a394468a3ee.jpg' },
    
    // Snacks & Meals
    { name: 'Sandwich Tuna Mayo', price: 25000, description: 'Sandwich tuna creamy.', stock: 60, isFavorite: true, categoryId: categories[6].id, image: 'https://i.pinimg.com/736x/ef/88/0a/ef880a1e7acdcec049e00a394468a3ee.jpg' },
    { name: 'Sandwich Ayam BBQ', price: 27000, description: 'Ayam BBQ smoky.', stock: 55, categoryId: categories[6].id, image: 'https://i.pinimg.com/736x/94/d2/b9/94d2b92dd01af3a70932378bae90bb8c.jpg' },
    { name: 'Sandwich Telur Mayo', price: 23000, description: 'Sandwich telur creamy.', stock: 75, isFavorite: true, categoryId: categories[6].id, image: 'https://i.pinimg.com/736x/94/d2/b9/94d2b92dd01af3a70932378bae90bb8c.jpg' },
    { name: 'Burger Mini Beef', price: 30000, description: 'Burger mini daging.', stock: 50, categoryId: categories[6].id, image: 'https://i.pinimg.com/736x/a6/22/be/a622beaaab9cd50a7f7cca579d802033.jpg' },
    { name: 'Burger Mini Chicken', price: 28000, description: 'Burger ayam mini.', stock: 45, categoryId: categories[6].id, image: 'https://i.pinimg.com/736x/d0/85/61/d0856157757e76efb1401adc1bdcbbd9.jpg' },
    { name: 'French Fries Small', price: 15000, description: 'Kentang goreng kecil.', stock: 140, categoryId: categories[6].id, image: 'https://i.pinimg.com/736x/fd/ff/fd/fdfffde65922346c40c3e60893f4d05d.jpg' },
    { name: 'French Fries Large', price: 20000, description: 'Kentang goreng besar.', stock: 130, categoryId: categories[6].id, image: 'https://i.pinimg.com/1200x/d3/67/b3/d367b3e37219433a9c92de2c3d1c08ef.jpg' },
    { name: 'Nugget Box 6pcs', price: 23000, description: 'Nugget crispy isi 6.', stock: 110, categoryId: categories[6].id, image: 'https://i.pinimg.com/736x/46/d8/15/46d815be729c637ceaf9be14d1f80a04.jpg' },
    { name: 'Nugget Box 10pcs', price: 30000, description: 'Nugget crispy isi 10.', stock: 90, categoryId: categories[6].id, image: 'https://i.pinimg.com/1200x/52/34/90/5234907fb35fc29a79936fafc078e70f.jpg' },
    { name: 'Sosis Goreng 5pcs', price: 18000, description: 'Sosis goreng renyah.', stock: 80, categoryId: categories[6].id, image: 'https://i.pinimg.com/1200x/52/34/90/5234907fb35fc29a79936fafc078e70f.jpg' },
    { name: 'Chicken Popcorn', price: 25000, description: 'Ayam kecil crispy.', stock: 70, isFavorite: true, categoryId: categories[6].id, image: 'https://i.pinimg.com/736x/c1/cb/a0/c1cba0e27ef3dce6a08989b356cf01f9.jpg' },
    { name: 'Mineral Water 600ml', price: 6000, description: 'Air mineral dingin.', stock: 200, categoryId: categories[6].id, image: 'https://i.pinimg.com/736x/c1/cb/a0/c1cba0e27ef3dce6a08989b356cf01f9.jpg' },
    { name: 'Mineral Water 330ml', price: 5000, description: 'Air mineral kecil.', stock: 250, categoryId: categories[6].id, image: 'https://i.pinimg.com/736x/7f/94/20/7f94202f7ea02b30f68d6744ef580e2d.jpg' },
    { name: 'Black Tea Hot', price: 18000, description: 'Teh hitam panas.', stock: 90, categoryId: categories[4].id, image: 'https://i.pinimg.com/736x/7f/94/20/7f94202f7ea02b30f68d6744ef580e2d.jpg' },
    { name: 'Black Tea Iced', price: 20000, description: 'Teh hitam dingin.', stock: 100, categoryId: categories[4].id, image: 'https://i.pinimg.com/1200x/a2/54/8b/a2548b27fe26bbc46ca7f954f5a6adb4.jpg' },
    { name: 'Lychee Tea', price: 23000, description: 'Teh lychee segar.', stock: 85, isFavorite: true, categoryId: categories[4].id, image: 'https://i.pinimg.com/1200x/64/0a/9f/640a9f2dc1774f17871bb0208576d367.jpg' },
    { name: 'Peach Tea', price: 23000, description: 'Teh peach wangi.', stock: 80, categoryId: categories[4].id, image: 'https://i.pinimg.com/736x/f0/65/5f/f0655f2737da76be9b4ac435c65e3d9b.jpg' },
    { name: 'Mango Smoothie', price: 32000, description: 'Smoothie mangga manis.', stock: 60, isFavorite: true, categoryId: categories[4].id, image: 'https://i.pinimg.com/736x/f0/65/5f/f0655f2737da76be9b4ac435c65e3d9b.jpg' },
    { name: 'Banana Smoothie', price: 30000, description: 'Smoothie pisang creamy.', stock: 55, categoryId: categories[4].id, image: 'https://i.pinimg.com/736x/f0/65/5f/f0655f2737da76be9b4ac435c65e3d9b.jpg' },
    { name: 'Avocado Juice', price: 35000, description: 'Jus alpukat creamy.', stock: 70, isFavorite: true, categoryId: categories[4].id, image: 'https://i.pinimg.com/736x/f0/65/5f/f0655f2737da76be9b4ac435c65e3d9b.jpg' },
  ];

  const products = [];
  for (const data of productData) {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        price_discount: 0,
        description: data.description,
        stock: data.stock,
        isFlashsale: data.isFlashsale || false,
        isFavorite: data.isFavorite || false,
        categoryId: data.categoryId,
        cartId: carts[0].id,
        product_images: {
          create: {
            image: data.image,
          },
        },
      },
    });
    products.push(product);
  }
  console.log('Created products with images');

  // Create Discounts
  await Promise.all([
    prisma.discount.create({
      data: { name: 'Diskon 5rb', dicount: 5000, productId: products[0].id },
    }),
    prisma.discount.create({
      data: { name: 'Diskon Natal', dicount: 10000, productId: products[1].id },
    }),
    prisma.discount.create({
      data: { name: 'Diskon 5rb', dicount: 5000, productId: products[6].id },
    }),
    prisma.discount.create({
      data: { name: 'Diskon Natal', dicount: 10000, productId: products[8].id },
    }),
  ]);
  console.log('Created discounts');

  // Create Size Products
  await Promise.all([
    prisma.sizeProduct.create({ data: { name: 'Small', costs: 0, productId: products[0].id } }),
    prisma.sizeProduct.create({ data: { name: 'Medium', costs: 5000, productId: products[0].id } }),
    prisma.sizeProduct.create({ data: { name: 'Large', costs: 10000, productId: products[0].id } }),
    prisma.sizeProduct.create({ data: { name: 'Small', costs: 0, productId: products[6].id } }),
    prisma.sizeProduct.create({ data: { name: 'Medium', costs: 5000, productId: products[6].id } }),
    prisma.sizeProduct.create({ data: { name: 'Large', costs: 10000, productId: products[6].id } }),
    prisma.sizeProduct.create({ data: { name: 'Small', costs: 0, productId: products[10].id } }),
    prisma.sizeProduct.create({ data: { name: 'Medium', costs: 5000, productId: products[10].id } }),
    prisma.sizeProduct.create({ data: { name: 'Large', costs: 10000, productId: products[10].id } }),
    prisma.sizeProduct.create({ data: { name: 'Regular', costs: 0, productId: products[35].id } }),
    prisma.sizeProduct.create({ data: { name: 'Large', costs: 5000, productId: products[36].id } }),
  ]);
  console.log('Created size products');

  // Create Variants
  await Promise.all([
    prisma.variant.create({ data: { name: 'Original', costs: 0, productId: products[0].id } }),
    prisma.variant.create({ data: { name: 'With Milk', costs: 5000, productId: products[0].id } }),
    prisma.variant.create({ data: { name: 'With Sugar', costs: 3000, productId: products[0].id } }),
    prisma.variant.create({ data: { name: 'Hot', costs: 0, productId: products[10].id } }),
    prisma.variant.create({ data: { name: 'Iced', costs: 2000, productId: products[10].id } }),
    prisma.variant.create({ data: { name: 'Extra Shot', costs: 8000, productId: products[10].id } }),
    prisma.variant.create({ data: { name: 'Original', costs: 0, productId: products[26].id } }),
    prisma.variant.create({ data: { name: 'Chocolate', costs: 5000, productId: products[26].id } }),
    prisma.variant.create({ data: { name: 'Cheese', costs: 7000, productId: products[26].id } }),
  ]);
  console.log('Created variants');

  // Create Tax
  await Promise.all([
    prisma.tax.create({ data: { name: 'PPN 11%', tax: 11, productId: products[0].id } }),
    prisma.tax.create({ data: { name: 'PPN 11%', tax: 11, productId: products[1].id } }),
    prisma.tax.create({ data: { name: 'PPN 11%', tax: 11, productId: products[6].id } }),
    prisma.tax.create({ data: { name: 'PPN 11%', tax: 11, productId: products[10].id } }),
    prisma.tax.create({ data: { name: 'PPN 11%', tax: 11, productId: products[26].id } }),
  ]);
  console.log('Created taxes');

  // Create Transactions
  const transactions = await Promise.all([
    prisma.transaction.create({
      data: {
        name_user: 'Ari Eka Saputra',
        address_user: 'Jl. Merdeka 1, Jakarta',
        phone_address: '081234567890',
        email_address: 'ari@example.com',
        total: 10500000,
        invoice_num: 'INV-0001',
      },
    }),
    prisma.transaction.create({
      data: {
        name_user: 'Rina Putri',
        address_user: 'Jl. Sudirman 2, Jakarta',
        phone_address: '081234567891',
        email_address: 'rina@example.com',
        total: 810000,
        invoice_num: 'INV-0002',
      },
    }),
    prisma.transaction.create({
      data: {
        name_user: 'Budi Santoso',
        address_user: 'Jl. Thamrin 3, Jakarta',
        phone_address: '081234567892',
        email_address: 'budi@example.com',
        total: 120000,
        invoice_num: 'INV-0003',
      },
    }),
    prisma.transaction.create({
      data: {
        name_user: 'Siti Aminah',
        address_user: 'Jl. Gatot Subroto 4, Jakarta',
        phone_address: '081234567893',
        email_address: 'siti@example.com',
        total: 255000,
        invoice_num: 'INV-0004',
      },
    }),
    prisma.transaction.create({
      data: {
        name_user: 'Andi Wijaya',
        address_user: 'Jl. Diponegoro 5, Jakarta',
        phone_address: '081234567894',
        email_address: 'andi@example.com',
        total: 507000,
        invoice_num: 'INV-0005',
      },
    }),
  ]);
  console.log('Created transactions');

  // Create Status Transactions
  await Promise.all([
    prisma.statusTransaction.create({ data: { status: 'complete', transactionId: transactions[0].id } }),
    prisma.statusTransaction.create({ data: { status: 'pending', transactionId: transactions[1].id } }),
    prisma.statusTransaction.create({ data: { status: 'complete', transactionId: transactions[2].id } }),
    prisma.statusTransaction.create({ data: { status: 'cancel', transactionId: transactions[3].id } }),
    prisma.statusTransaction.create({ data : { status: 'complete', transactionId: transactions[4].id } }),
]);
console.log('Created status transactions');
// Create Deliveries
const deliveries = await Promise.all([
prisma.delivery.create({ data: { name: 'JNE', costs: 20000, transactionId: transactions[0].id } }),
prisma.delivery.create({ data: { name: 'TIKI', costs: 15000, transactionId: transactions[1].id } }),
prisma.delivery.create({ data: { name: 'SiCepat', costs: 10000, transactionId: transactions[2].id } }),
prisma.delivery.create({ data: { name: 'Gojek Instant', costs: 5000, transactionId: transactions[3].id } }),
prisma.delivery.create({ data: { name: 'GrabExpress', costs: 7000, transactionId: transactions[4].id } }),
]);
console.log('Created deliveries');
// Create Payment Methods
const paymentMethods = await Promise.all([
prisma.paymentMethod.create({ data: { name: 'BCA', image: 'https://logo.clearbit.com/bca.co.id', transactionId: transactions[0].id } }),
prisma.paymentMethod.create({ data: { name: 'Mandiri', image: 'https://logo.clearbit.com/mandiri.co.id', transactionId: transactions[1].id } }),
prisma.paymentMethod.create({ data: { name: 'OVO', image: 'https://logo.clearbit.com/ovo.id', transactionId: transactions[2].id } }),
prisma.paymentMethod.create({ data: { name: 'Dana', image: 'https://logo.clearbit.com/dana.id', transactionId: transactions[3].id } }),
prisma.paymentMethod.create({ data: { name: 'COD', image: null, transactionId: transactions[4].id } }),
]);
console.log('Created payment methods');
// Create Transaction Items
await Promise.all([
prisma.transactionItem.create({ data: { quantity: 1, subtotal: 10500000, transactionId: transactions[0].id } }),
prisma.transactionItem.create({ data: { quantity: 2, subtotal: 810000, transactionId: transactions[1].id } }),
prisma.transactionItem.create({ data: { quantity: 3, subtotal: 120000, transactionId: transactions[2].id } }),
prisma.transactionItem.create({ data: { quantity: 1, subtotal: 255000, transactionId: transactions[3].id } }),
prisma.transactionItem.create({ data: { quantity: 2, subtotal: 507000, transactionId: transactions[4].id } }),
]);
console.log('Created transaction items');
// Create Ratings
await Promise.all([
prisma.rating.create({ data: { review: 'Kopi arabica terbaik yang pernah saya coba!', rating: 5, productId: products[0].id } }),
prisma.rating.create({ data: { review: 'Robusta yang strong, cocok untuk pagi hari', rating: 4, productId: products[1].id } }),
prisma.rating.create({ data: { review: 'Cold brew nya enak dan smooth', rating: 5, productId: products[6].id } }),
prisma.rating.create({ data: { review: 'Latte hazelnut favorit saya!', rating: 5, productId: products[10].id } }),
prisma.rating.create({ data: { review: 'Croissant nya buttery dan flaky', rating: 4, productId: products[26].id } }),
prisma.rating.create({ data: { review: 'Sandwich tuna mayo enak banget', rating: 5, productId: products[30].id } }),
prisma.rating.create({ data: { review: 'Nugget crispy dan lezat', rating: 4, productId: products[37].id } }),
prisma.rating.create({ data: { review: 'Matcha latte premium memang beda', rating: 5, productId: products[17].id } }),
prisma.rating.create({ data: { review: 'Thai tea nya manis pas', rating: 4, productId: products[23].id } }),
prisma.rating.create({ data: { review: 'Cappuccino foam nya tebal sempurna', rating: 5, productId: products[12].id } }),
]);
console.log('Created ratings');
console.log('Seed completed successfully!');
}
main()
.catch((e) => {
console.error(e);
process.exit(1);
})
.finally(async () => {
await prisma.$disconnect();
});