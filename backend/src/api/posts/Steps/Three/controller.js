import Step3Data from './model.js';

export const createStep3Data = async (req, res) => {
  try {
    console.log("Received Step 3 Data:", req.body);
    const { quantity, price, sampleNeeded, preferredCommunication, recruitmentPeriod, deliveryDate } = req.body;

    const step3Data = await Step3Data.create({
      quantity,
      price,
      sampleNeeded,
      preferredCommunication,
      recruitmentPeriod,
      deliveryDate,
    });

    res.status(201).json(step3Data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getStep3DataById = async (req, res) => {
  try {
    const { id } = req.params;
    const step3Data = await Step3Data.findByPk(id);

    if (step3Data) {
      res.json(step3Data);
    } else {
      res.status(404).json({ message: 'Step3 data not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllStep3Data = async (req, res) => {
  try {
    const data = await Step3Data.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteStep3Data = async (req, res) => {
  try {
    const { id } = req.params;
    const step3Data = await Step3Data.findByPk(id);

    if (!step3Data) {
      return res.status(404).json({ message: 'Data not found' });
    }

    await step3Data.destroy();
    res.json({ message: 'Data deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Step3 데이터 수정 기능 추가
export const updateStep3Data = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, price, sampleNeeded, preferredCommunication, recruitmentPeriod, deliveryDate } = req.body;

    const step3Data = await Step3Data.findByPk(id);

    if (!step3Data) {
      return res.status(404).json({ message: 'Data not found' });
    }

    // 데이터 업데이트
    step3Data.quantity = quantity;
    step3Data.price = price;
    step3Data.sampleNeeded = sampleNeeded;
    step3Data.preferredCommunication = preferredCommunication;
    step3Data.recruitmentPeriod = recruitmentPeriod;
    step3Data.deliveryDate = deliveryDate;

    await step3Data.save();

    res.json(step3Data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};