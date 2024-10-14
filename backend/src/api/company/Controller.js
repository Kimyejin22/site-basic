import Company from './Model.js';


export const getAllCompanies = async (req, res) => {
    try {
      const companies = await Company.findAll();
      res.json(companies);
    } catch (err) {
      console.error("Error fetching companies:", err.message);
      res.status(500).json({ error: err.message });
    }
  };
  

  export const getCompanyById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const company = await Company.findByPk(id);
      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }
      res.json(company);
    } catch (err) {
      console.error("Error fetching company:", err.message);
      res.status(500).json({ error: err.message });
    }
  };
  

  export const createCompany = async (req, res) => {
    const { companyName, businessNumber, ceo, address } = req.body;

    console.log("Request Body:", req.body);  // 추가된 로그

      // 필수 필드가 모두 입력되었는지 확인
    if (!companyName || !businessNumber || !ceo || !address) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
    try {
      const newCompany = await Company.create({ companyName, businessNumber, ceo, address });
      res.status(201).json(newCompany);
    } catch (err) {
      console.error("Error creating company:", err.message);
      res.status(500).json({ error: err.message });
    }
  };
  

  export const updateCompany = async (req, res) => {
    const { id } = req.params;
    const { companyName, businessNumber, ceo, address } = req.body;
  
    try {
      const company = await Company.findByPk(id);
      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }
  
      company.companyName = companyName || company.companyName;
      company.businessNumber = businessNumber || company.businessNumber;
      company.ceo = ceo || company.ceo;
      company.address = address || company.address;
  
      await company.save();
      res.json(company);
    } catch (err) {
      console.error("Error updating company:", err.message);
      res.status(500).json({ error: err.message });
    }
  };
  

  export const deleteCompany = async (req, res) => {
    const { id } = req.params;
  
    try {
      const company = await Company.findByPk(id);
      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }
  
      await company.destroy();
      res.status(204).send();
    } catch (err) {
      console.error("Error deleting company:", err.message);
      res.status(500).json({ error: err.message });
    }
  };