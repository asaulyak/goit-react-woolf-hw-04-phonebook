import css from './Filter.module.css';

export function Filter({ onSearch }) {
  const handleSearch = event => onSearch(event.target.value);

  return (
    <div className={css.filter}>
      <label htmlFor="search">Find contacts by name</label>
      <input type="search" name="search" onChange={handleSearch} />
    </div>
  );
}
