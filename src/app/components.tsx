interface ComponentProps {
  children: React.ReactNode;
  className?: string;
}

interface TableRowProps extends ComponentProps {
  isEven?: boolean;
}

export const Table: React.FC<ComponentProps> = ({ children, className }) => {
  return (
    <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
      {children}
    </table>
  );
};

export const TableHeader: React.FC<ComponentProps> = ({ children, className }) => {
  return (
    <thead className="bg-gray-200 text-gray-700">
      {children}
    </thead>
  );
};

interface TableHeaderCellProps extends ComponentProps {
  width?: string;
}

export const TableHeaderCell: React.FC<TableHeaderCellProps> = ({ children, className, width }) => {
  return (
    <th style={{ width }} className={`p-3 border border-gray-300 bg-gray-200 text-gray-700 font-semibold ${className}`}>
      {children}
    </th>
  );
};

export const TableRow: React.FC<TableRowProps> = ({ children, isEven, className }) => {
  return (
    <tr className={`${isEven ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition ${className}`}>
      {children}
    </tr>
  );
};

export const TableCell: React.FC<ComponentProps> = ({ children, className }) => {
  return (
    <td className={`p-3 border border-gray-300 ${className}`}>
      {children}
    </td>
  );
};

export const Tag: React.FC<ComponentProps> = ({ children, className }) => {
  return (
    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full m-1">
      {children}
    </span>
  )
}

export const LoadingPlaceholder: React.FC = () => {
  return (
    <tbody>
      <tr className="h-24">
        <td colSpan={7} className="p-3 text-center text-gray-500 font-semibold align-middle">
          Loading Advocates...
        </td>
      </tr>
    </tbody>
  );
};
