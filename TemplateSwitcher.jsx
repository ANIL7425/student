function TemplateSwitcher({ template, setTemplate }) {
    return (
      <div className="mb-4">
        <label className="font-semibold mr-2">Choose Template:</label>
        <select value={template} onChange={(e) => setTemplate(e.target.value)} className="input">
          <option value="template1">Template 1</option>
          <option value="template2">Template 2</option>
        </select>
      </div>
    );
  }
  
  export default TemplateSwitcher;
  