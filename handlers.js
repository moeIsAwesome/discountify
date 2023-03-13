const { Code } = require('./Schema');

async function getAllCodes(req, res) {
  try {
    const allCodesInDB = await Code.find({});
    res.json(allCodesInDB);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
}

async function createCode(req, res) {
  try {
    const newCode = new Code(req.body);
    const validationError = newCode.validateSync();
    if (validationError) {
      res.status(400).json({ message: validationError.message });
      return;
    }
    await newCode.save();
    res.json(newCode);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
}

async function updateCode(req, res) {
  try {
    const codeToBeUpdatedId = req.params.id;
    const newStatus = req.body.status;
    const codeWithUpdateStatus = await Code.findByIdAndUpdate(
      codeToBeUpdatedId,
      { status: newStatus },
      { new: true }
    );
    const validationError = codeWithUpdateStatus.validateSync();
    if (validationError) {
      res.status(400).json({ message: validationError.message });
      return;
    }
    res.json(codeWithUpdateStatus);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
}

async function deleteCode(req, res) {
  try {
    const codeToBeDeletedId = req.params.id;
    const deletedCode = await Code.findByIdAndDelete(codeToBeDeletedId);
    if (deletedCode) {
      res.json(deletedCode);
    } else {
      res.status(404).json({ message: `Code ${codeToBeDeletedId} not found` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
}

module.exports = {
  getAllCodes,
  createCode,
  updateCode,
  deleteCode,
};
