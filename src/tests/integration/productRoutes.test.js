const express = require('express');
const request = require('supertest');
const bodyParser = require('body-parser');

const productController = require('../../controllers/productController');
const productService = require('../../services/productService');

jest.mock('../../services/productService');

const app = express();
app.use(bodyParser.json());

app.get('/products/establishment/:estabilshmentId', productController.getProductByEstablishmentController);
app.get('/products/type/:typeId', productController.getProductByTypeController);
app.get('/products/:productId', productController.getProductByIdController);
app.get('/products', productController.getProductController);
app.post('/products', productController.createProductController);
app.patch('/products/:productId', productController.updateProductController);
app.delete('/products/:productId', productController.deleteProductController);

describe('Product Integration Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /products/establishment/:establishment - should fetch product by establishment', async () => {
    const mockProduct = { idProduto: 6, nomeProduto: 'pasta dos dentes', descricaoPorduto: 'marca: colgate', precoProduto: 3, imagemProduto: '182742123-21324189.png', tipoProdutoidTipoProduto: 3, estadoProdutoidEstadoPorduto: 2, EstabelecimentoidEstabelecimento: 4  };
    productService.getProductByEstablishment.mockResolvedValue(mockProduct);
    
    const response = await request(app).get('/products/establishment/4');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Product fetched successfully',
      product: mockProduct,
    });
  });

  test('GET /products/type/:typeId - should fetch product by type', async () => {
    const mockProduct = { idProduto: 6, nomeProduto: 'pasta dos dentes', descricaoPorduto: 'marca: colgate', precoProduto: 3, imagemProduto: '182742123-21324189.png', tipoProdutoidTipoProduto: 3, estadoProdutoidEstadoPorduto: 2, EstabelecimentoidEstabelecimento: 4  };
    productService.getProductByType.mockResolvedValue(mockProduct);
    
    const response = await request(app).get('/products/type/3');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Product fetched successfully',
      product: mockProduct,
    });
  });

  
  test('GET /products/:productId - should fetch product by ID', async () => {
    const mockProduct = { idProduto: 6, nomeProduto: 'pasta dos dentes', descricaoPorduto: 'marca: colgate', precoProduto: 3, imagemProduto: '182742123-21324189.png', tipoProdutoidTipoProduto: 3, estadoProdutoidEstadoPorduto: 2, EstabelecimentoidEstabelecimento: 4  };
    productService.getProductById.mockResolvedValue(mockProduct);
    
    const response = await request(app).get('/products/6');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Product fetched successfully',
      product: mockProduct,
    });
  });

  test('GET /products - should fetch all products', async () => {
    const mockProducts = [{ idProduto: 6, nomeProduto: 'pasta dos dentes', descricaoPorduto: 'marca: colgate', precoProduto: 3, imagemProduto: '182742123-21324189.png', tipoProdutoidTipoProduto: 3, estadoProdutoidEstadoPorduto: 2, EstabelecimentoidEstabelecimento: 4 }];
    productService.getProduct.mockResolvedValue(mockProducts);

    const response = await request(app).get('/products');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Products fetched successfully',
      product: mockProducts,
    });
  });
  
  test('GET /products/:productId - should fetch product by ID', async () => {
    const mockProduct = { idProduto: 6, nomeProduto: 'pasta dos dentes', descricaoPorduto: 'marca: colgate', precoProduto: 3, imagemProduto: '182742123-21324189.png', tipoProdutoidTipoProduto: 3, estadoProdutoidEstadoPorduto: 2, EstabelecimentoidEstabelecimento: 4  };
    productService.getProductById.mockResolvedValue(mockProduct);

    const response = await request(app).get('/products/6');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Product fetched successfully',
      product: mockProduct,
    });
  });


  test('POST /products - should create a new product', async () => {
    const newProduct = {
      nomeProduto: 'Sumo',
      descricaoProduto: 'marca: Compal',
      precoProduto: 3,
      tipoProdutoidTipoProduto: 2,
      estadoProdutoidEstadoProduto: 1,
      EstabelecimentoidEstabelecimento: 5,
    };

    const mockCreatedProduct = { idProduto: 3, ...newProduct};

    productService.createProduct.mockResolvedValue(mockCreatedProduct);

    const response = await request(app)
      .post('/products')
      .send(newProduct);

    expect(response.status).toBe(400);
  });

  test('PATCH /products/:productId - should update a product', async () => {
    const updatedFields = { precoProduto: 4 };
    productService.updateProduct.mockResolvedValue();

    const response = await request(app)
      .patch('/products/2')
      .send(updatedFields);

    expect(productService.updateProduct).toHaveBeenCalledWith('2', updatedFields);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Product updated successfully' });
  });

  test('DELETE /products/:productId - should delete a product', async () => {
    productService.deleteProduct.mockResolvedValue();

    const response = await request(app).delete('/products/3');

    expect(productService.deleteProduct).toHaveBeenCalledWith('3');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Product deleted successfully' });
  });
});
