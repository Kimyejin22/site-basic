import Step1Data from './model.js';

export const createStep1Data = async (req, res) => {
  try {
    const { selectedCategory, selectedSubcategory } = req.body;

    const step1Data = await Step1Data.create({
      selectedCategory,
      selectedSubcategory,
    });

    res.status(201).json(step1Data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getStep1DataById = async (req, res) => {
  try {
    const { id } = req.params;
    const step1Data = await Step1Data.findByPk(id);

    if (step1Data) {
      res.json(step1Data);
    } else {
      res.status(404).json({ message: 'Step1 data not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 데이터 삭제
export const deleteStep1Data = async (req, res) => {
    try {
      const { id } = req.params;
      const step1Data = await Step1Data.findByPk(id);
  
      if (!step1Data) {
        return res.status(404).json({ message: 'Data not found' });
      }
  
      await step1Data.destroy();
      res.json({ message: 'Data deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // 모든 데이터 가져오기
  export const getAllStep1Data = async (req, res) => {
    try {
      const data = await Step1Data.findAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // Step1 데이터 업데이트
export const updateStep1Data = async (req, res) => {
    try {
      const { id } = req.params;
      const { selectedCategory, selectedSubcategory } = req.body;
  
      const step1Data = await Step1Data.findByPk(id);
  
      if (step1Data) {
        // 데이터 업데이트
        step1Data.selectedCategory = selectedCategory;
        step1Data.selectedSubcategory = selectedSubcategory;
        await step1Data.save();
        
        res.json(step1Data);
      } else {
        res.status(404).json({ message: 'Step1 data not found' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };