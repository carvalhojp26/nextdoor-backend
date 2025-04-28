const multer = require('multer');
const path = require('path');



//Diz onde guardar e como nomear os ficheiros
const storage = multer.diskStorage({  //diz que os   ficheiros serão guardados no disco (servidor) — não na memória.
  destination: (req, file, cb) => {
    cb(null, 'src/uploads/');  //Define em que pasta as imagens vão ser guardadas: 'src/uploads/'.
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); //Gera um nome único para cada imagem para evitar sobrescrever imagens com o mesmo nome, Usa a hora atual (Date.now()) + um número aleatório (Math.random()).
    cb(null, uniqueSuffix + path.extname(file.originalname)); //Mantém a extensão original (tipo .png, .jpg).
  }
});

//Aceita apenas imagens JPEG/JPG/PNG
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|avif/; //Garante que só imagens .jpeg, .jpg ou .png sejam aceites.
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase()); //A extensão do ficheiro (.jpg, .png, etc.).
  const mimetype = allowedTypes.test(file.mimetype); //O tipo MIME do ficheiro (image/jpeg, image/png, etc.).

  if (extname && mimetype) {
    return cb(null, true); //Se for uma imagem válida, chama cb(null, true), o que permite o upload.
  } else {
    cb(new Error('Only images are allowed, types jpeg, jpg, png, avif!'));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

//frontend, fazer img.src = SERVER_URL + '/uploads/' + imagemProduto

module.exports = upload