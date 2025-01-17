import { CfpService } from './cfp.service.js';
import express from 'express';

export const cfpRouter = express.Router();

// get all cfps
cfpRouter.get('/', async (_, res) => {
  try {
    const cfps = await CfpService.getAllCfps();
    res.status(200).send({ success: true, cfps });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// get cfp by id
cfpRouter.get('/id/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(422).send({ success: false, message: 'Invalid id parameter' });
    }

    const cfps = await CfpService.getCfpsById(id);
    res.status(200).send({ success: true, cfps });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// get cfp by slug
cfpRouter.get('/slug/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      res
        .status(422)
        .send({ success: false, message: 'Invalid slug parameter' });
    }

    const cfps = await CfpService.getCfpsBySlug(slug);
    res.status(200).send({ success: true, cfps });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// add cfp
cfpRouter.post('/create', async (req, res) => {
  try {
    const { data } = req.body;

    if (!data) {
      res.status(422).send({ success: false, message: 'Invalid data' });
    }
    const cfps = await CfpService.createCfp(data);
    res.status(200).send({ success: true, cfps });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// update cfp
cfpRouter.post('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;
    if (!id) {
      res.status(422).send({ success: false, message: 'Invalid id parameter' });
    }
    if (!data) {
      res.status(422).send({ success: false, message: 'Invalid data' });
    }
    const cfps = await CfpService.updateCfp(id, data);
    res.status(200).send({ success: true, cfps });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// delete cfp by id
cfpRouter.post('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      res.status(422).send({ success: false, message: 'Invalid id' });
    }
    const cfps = await CfpService.deleteCfp(id);
    res.status(200).send({ success: true, cfps });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
