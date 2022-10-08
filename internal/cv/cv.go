package cv

type DocClass int64

const (
	Casual DocClass = iota
	Classic
	Oldstyle
	Banking
)

func (c DocClass) String() string {
	switch c {
	case Casual:
		return "casual"
	case Classic:
		return "classic"
	case Banking:
		return "banking"
	case Oldstyle:
		return "oldstyle"
	}
	return "unknown"
}

type CurriculumVitae struct {
	FirstName string
	LastName  string
	Phone     string
	Mail      string
	Address   string
	Color     string
	Class     DocClass
	Areas     []Area
}

type Area struct {
	Name   string
	Fields []Field
}

type FieldClass int64

const (
	OneAttr FieldClass = iota
	MultiAttr
	SingleLineList
	TwoLineList
)

func (c FieldClass) String() string {
	switch c {
	case OneAttr:
		return "one-attr"
	case MultiAttr:
		return "multi-attr"
	case SingleLineList:
		return "single-line-list"
	case TwoLineList:
		return "two-line-list"
	}
	return "unknown"
}

type Field struct {
	FieldClass FieldClass //one-attr, multiple-attr, simple-list, two-line-list
	Value      []string
}
