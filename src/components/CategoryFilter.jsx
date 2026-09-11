import {Button, ButtonGroup} from 'react-bootstrap';

function CategoryFilter({categories, activeCategory, onCategoryChange}) {
  return (
    <ButtonGroup className="mb-3 flex-wrap">
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? 'primary' : 'outline-primary'}
          size="sm"
          style={{fontFamily: 'var(--font-mono)', fontSize: '0.8rem'}}
          onClick={() => onCategoryChange(category)}
        >
          {category === 'all' ? 'Semua' : `#${category}`}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default CategoryFilter;
