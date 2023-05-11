const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
  const getCats = await Category.findAll({ include: [{model:Product}]});
  res.status(200).json(getCats);
  } catch(err){
    res.status(500).json(err)
  };
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try{
  const getCat = await Category.findByPk(req.params.id, { include: [{model:Product}]});
  if(!getCat){
    res.status(400).json({message: 'Category not found with that ID.'});
    return;
  }
  res.status(200).json(getCat);
  } catch(err){
    res.status(500).json(err)
  };
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try{
    const addCat = await Category.create(req.body);
    res.status(200).json(addCat);
    } catch(err){
      res.status(500).json(err)
    };
  // create a new category
});

router.put('/:id', async (req, res) => {
  try{
    const updateCat = await Category.update(req.body, {where: {id: req.params.id}});

    if(!updateCat){
      res.status(400).json({message: 'Category not found with that ID'});
    }
    res.status(200).json(updateCat);
  } catch(err){
    res.status(500).json(err);
  }
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try{
    const deleteCat = await Category.destroy({where: {id: req.params.id}});

    if(!deleteCat){
      res.status(400).json({message: 'Category not found with that ID'});
    }
    res.status(200).json(deleteCat);
  } catch(err){
    res.status(500).json(err);
  }
  // delete a category by its `id` value
});

module.exports = router;
