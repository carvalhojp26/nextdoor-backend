const productService = require("../../services/productService");
const { Produto } = require("../../models/association/associations");

jest.mock("../../models/association/associations", () => ({
  Produto: {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
}));

describe("Product Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should fetch a product by ID", async () => {
    const productId = 1;
    const mockProduct = {
      idProduto: productId,
      nomeProduto: "shampoo",
      descricaoPorduto: "anti-caspa",
      precoProduto: 6,
      imagemProduto: "987654321-123456789.png",
      tipoProdutoidTipoProduto: 1,
      estadoProdutoidEstadoPorduto: 2,
      EstabelecimentoidEstabelecimento: 1,
    };

    Produto.findOne.mockResolvedValue(mockProduct);

    const result = await productService.getProductById(productId);

    expect(Produto.findOne).toHaveBeenCalledWith(
      expect.objectContaining({ where: { idProduto: productId } })
    );
    expect(result).toEqual(mockProduct);
  });

  test("should fetch products by type", async () => {
    const typeId = 5;
    const mockProducts = [
      {
        idProduto: 2,
        nomeProduto: "polo",
        descricaoPorduto: "marca: hugo boss",
        precoProduto: 40,
        imagemProduto: "26124921454-726129314.png",
        tipoProdutoidTipoProduto: typeId,
        estadoProdutoidEstadoPorduto: 2,
        EstabelecimentoidEstabelecimento: 4,
      },
      {
        idProduto: 3,
        nomeProduto: "calça de ganga",
        descricaoPorduto: "marca: Levis",
        precoProduto: 70,
        imagemProduto: "123814701-134968134.png",
        tipoProdutoidTipoProduto: typeId,
        estadoProdutoidEstadoPorduto: 2,
        EstabelecimentoidEstabelecimento: 1,
      },
    ];

    Produto.findAll.mockResolvedValue(mockProducts);

    const result = await productService.getProductByType(typeId);

    expect(Produto.findAll).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { tipoProdutoidTipoProduto: typeId },
      })
    );
    expect(result).toEqual(mockProducts);
  });

  test("should fetch products by estabishment", async () => {
    const establishmentId = 1;
    const mockProducts = [
      {
        idProduto: 4,
        nomeProduto: "arroz",
        descricaoPorduto: "marca: Caçarola",
        precoProduto: 2,
        imagemProduto: "483291413-319319743.png",
        tipoProdutoidTipoProduto: 2,
        estadoProdutoidEstadoPorduto: 2,
        EstabelecimentoidEstabelecimento: establishmentId,
      },
      {
        idProduto: 5,
        nomeProduto: "massa",
        descricaoPorduto: "marca: Milaneza",
        precoProduto: 3,
        imagemProduto: "134913491-341954319.png",
        tipoProdutoidTipoProduto: 2,
        estadoProdutoidEstadoPorduto: 2,
        EstabelecimentoidEstabelecimento: establishmentId,
      },
    ];

    Produto.findAll.mockResolvedValue(mockProducts);

    const result = await productService.getProductByEstablishment(
      establishmentId
    );

    expect(Produto.findAll).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { EstabelecimentoidEstabelecimento: establishmentId },
      })
    );
    expect(result).toEqual(mockProducts);
  });

  test("should fetch all products", async () => {
    const mockProduct = {
      idProduto: 6,
      nomeProduto: "pasta dos dentes",
      descricaoPorduto: "marca: colgate",
      precoProduto: 3,
      imagemProduto: "182742123-21324189.png",
      tipoProdutoidTipoProduto: 3,
      estadoProdutoidEstadoPorduto: 2,
      EstabelecimentoidEstabelecimento: 4,
    };
    Produto.findAll.mockResolvedValue(mockProduct);

    const result = await productService.getProduct();

    expect(Produto.findAll).toHaveBeenCalled();
    expect(result).toEqual(mockProduct);
  });

  test("should create a product", async () => {
    const newMockProduct = {
      nomeProduto: "gelado",
      descricaoPorduto: "marca: ola",
      precoProduto: 4,
      imagemProduto: "11532421-372193145.png",
      tipoProdutoidTipoProduto: 2,
      estadoProdutoidEstadoPorduto: 2,
      EstabelecimentoidEstabelecimento: 1,
    };
    Produto.create.mockResolvedValue(newMockProduct);

    const result = await productService.createProduct(newMockProduct);

    expect(Produto.create).toHaveBeenCalledWith(newMockProduct);
    expect(result).toEqual(newMockProduct);
  });

  test("should update a product", async () => {
    Produto.update.mockResolvedValue([1]);

    const result = await productService.updateProduct(1, { precoProduto: 5 });

    expect(Produto.update).toHaveBeenCalledWith(
      { precoProduto: 5 },
      { where: { idProduto: 1 } }
    );
    expect(result).toEqual(1);
  });

  test("should delete a product", async () => {
    Produto.destroy.mockResolvedValue(1);

    const result = await productService.deleteProduct(1);

    expect(Produto.destroy).toHaveBeenCalledWith({ where: { idProduto: 1 } });
    expect(result).toBe(1);
  });
});
