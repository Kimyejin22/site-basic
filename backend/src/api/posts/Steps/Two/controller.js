import Step2Data from './model.js';

export const createStep2Data = async (req, res) => {
  try {
    const { selectedCategory, selectedSubcategory } = req.body;

    const step2Data = await Step2Data.create({
      selectedCategory,
      selectedSubcategory,
    });

    res.status(201).json(step2Data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getStep2DataById = async (req, res) => {
  try {
    const { id } = req.params;
    const step2Data = await Step2Data.findByPk(id);

    if (step2Data) {
      res.json(step2Data);
    } else {
      res.status(404).json({ message: 'Step2 data not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 데이터 삭제
export const deleteStep2Data = async (req, res) => {
    try {
      const { id } = req.params;
      const step2Data = await Step2Data.findByPk(id);
  
      if (!step2Data) {
        return res.status(404).json({ message: 'Data not found' });
      }
  
      await step2Data.destroy();
      res.json({ message: 'Data deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // 모든 데이터 가져오기
  export const getAllStep2Data = async (req, res) => {
    try {
      const data = await Step2Data.findAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // Step2 데이터 업데이트
export const updateStep2Data = async (req, res) => {
    try {
      const { id } = req.params;
      const { selectedCategory, selectedSubcategory } = req.body;
  
      const step2Data = await Step2Data.findByPk(id);
  
      if (step2Data) {
        // 데이터 업데이트
        step2Data.selectedCategory = selectedCategory;
        step2Data.selectedSubcategory = selectedSubcategory;
        await step2Data.save();
        
        res.json(step2Data);
      } else {
        res.status(404).json({ message: 'Step2 data not found' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };