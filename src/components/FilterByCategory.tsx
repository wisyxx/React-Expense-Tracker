import { categories } from '../data/categories';

export const FilterByCategory = () => {
  return (
    <div className=" bg-white shadow-lg rounded-lg p-10">
      <form>
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <label htmlFor="category">Filter expenses</label>
          <select
            defaultValue={'DEFAULT'}
            name="category"
            id="category"
            className="bg-slate-100 p-3 flex-1 ronunded"
          >
            <option disabled value="DEFAULT">
              Select category
            </option>
            {categories.map((category) => (
              <option value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};
