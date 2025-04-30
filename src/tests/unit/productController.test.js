const productController = require('../../controllers/productController');
const productService = require('../../services/productService');

jest.mock('../../services/productService');

describe('Product Controller', () => {
  let req, res;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch products by ID', async () => {
    const mockProduct = { idProduto: 6, nomeProduto: 'pasta dos dentes', descricaoPorduto: 'marca: colgate', precoProduto: 3, imagemProduto: '182742123-21324189.png', tipoProdutoidTipoProduto: 3, estadoProdutoidEstadoPorduto: 2, EstabelecimentoidEstabelecimento: 4  };
    req.params.productId = 6;
  
    productService.getProductById.mockResolvedValue(mockProduct);
  
    await productController.getProductByIdController(req, res);
  
    expect(productService.getProductById).toHaveBeenCalledWith(6);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Product fetched successfully',
      product: mockProduct,
    });
  });

  test('should fetch products by type', async () => {
    const mockProducts = [
        { idProduto: 2, nomeProduto: 'polo', descricaoPorduto: 'marca: hugo boss', precoProduto: 40, imagemProduto: '26124921454-726129314.png', tipoProdutoidTipoProduto: 2, estadoProdutoidEstadoPorduto: 2, EstabelecimentoidEstabelecimento: 4},
        { idProduto: 3, nomeProduto: 'calça de ganga', descricaoPorduto: 'marca: Levis', precoProduto: 70, imagemProduto: '123814701-134968134.png', tipoProdutoidTipoProduto: 2, estadoProdutoidEstadoPorduto: 2, EstabelecimentoidEstabelecimento: 1}];
    req.params.typeId = 2;
  
    productService.getProductByType.mockResolvedValue(mockProducts);
  
    await productController.getProductByTypeController(req, res);
  
    expect(productService.getProductByType).toHaveBeenCalledWith(2);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Product fetched successfully',
      product: mockProducts,
    });
  });

  test('should fetch products by establishment', async () => {
    const mockProducts = [
      { idProduto: 4, nomeProduto: 'arroz', descricaoPorduto: 'marca: Caçarola', precoProduto: 2, imagemProduto: '483291413-319319743.png', tipoProdutoidTipoProduto: 2, estadoProdutoidEstadoPorduto: 2, EstabelecimentoidEstabelecimento: 1},
      { idProduto: 5, nomeProduto: 'massa', descricaoPorduto: 'marca: Milaneza', precoProduto: 3, imagemProduto: '134913491-341954319.png', tipoProdutoidTipoProduto: 2, estadoProdutoidEstadoPorduto: 2, EstabelecimentoidEstabelecimento: 1}];

      req.params.establishmentId = 1;
  
    productService.getProductByEstablishment.mockResolvedValue(mockProducts);
  
    await productController.getProductByEstablishmentController(req, res);
  
    expect(productService.getProductByEstablishment).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Product fetched successfully',
      product: mockProducts,
    });
  });

  test('should fetch all products', async () => {
    const mockProduct = { idProduto: 6, nomeProduto: 'pasta dos dentes', descricaoPorduto: 'marca: colgate', precoProduto: 3, imagemProduto: '182742123-21324189.png', tipoProdutoidTipoProduto: 3, estadoProdutoidEstadoPorduto: 2, EstabelecimentoidEstabelecimento: 4 }
    const mockProductsArray = [mockProduct];
    productService.getProduct.mockResolvedValue(mockProductsArray);

    await productController.getProductController(req, res);

    expect(productService.getProduct).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Products fetched successfully',
      product: mockProductsArray,
    }));
  });

  test('should create a product', async () => {
    const productBody = { nomeProduto: 'gelado', descricaoProduto: 'marca: ola', precoProduto: 4, tipoProdutoidTipoProduto: 2, estadoProdutoidEstadoProduto: 2, EstabelecimentoidEstabelecimento: 1 };
    const mockFile = { filename: '11532421-372193145.png' }; 
    const expectedDataForService = { ...productBody, imagemProduto: mockFile.filename }; 
    const mockReturnedProduct = { idProduto: 4, ...expectedDataForService };
  
    req.body = productBody;
    req.file = mockFile;
  
    productService.createProduct.mockResolvedValue(mockReturnedProduct);
  
    await productController.createProductController(req, res);
  
    expect(productService.createProduct).toHaveBeenCalledWith(expectedDataForService); 
    expect(res.status).toHaveBeenCalledWith(201);

    expect(res.json).toHaveBeenCalledWith({
      message: 'Product added successfully',
      product: mockReturnedProduct,
    });
  });

  test('should update a product', async () => {
    req.params.productId = 6;
    req.body = { precoProduto: 4 };
    productService.updateProduct.mockResolvedValue([6]);

    await productController.updateProductController(req, res);

    expect(productService.updateProduct).toHaveBeenCalledWith(6, { precoProduto: 4 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Product updated successfully' });
  });

  test('should delete a product', async () => {
    req.params.productId = 6;
    productService.deleteProduct.mockResolvedValue(6);

    await productController.deleteProductController(req, res);

    expect(productService.deleteProduct).toHaveBeenCalledWith(6);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Product deleted successfully' });
  });
});
