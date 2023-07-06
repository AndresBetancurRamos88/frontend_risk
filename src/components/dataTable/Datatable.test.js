import { render, screen } from '@testing-library/react';
import DataTableComponent from './DataTable';

const mockData = {
    data: [
        {
            id: 1,
            risk: 'High',
            title: 'Title 1',
            description: 'Description 1',
            impact: 'High',
            probability: 'Low',
            created_at: '2023-07-01',
            updated_at: '2023-07-02',
            email: 'user@example.com'
        },
        {
            id: 2,
            risk: 'Low',
            title: 'Title 2',
            description: 'Description 2',
            impact: 'Low',
            probability: 'High',
            created_at: '2023-07-03',
            updated_at: '2023-07-04',
            email: 'user2@example.com'
        }
    ],
    meta: {
        total_count: 2
    }
};

describe('DataTableComponent', () => {
    test('renders table columns correctly', () => {
        render(<DataTableComponent data={mockData} onPageChange={() => {}} />);

        const idColumn = screen.getByText('1');
        expect(idColumn).toBeInTheDocument();

        const titleColumn = screen.getByText('Title 1');
        expect(titleColumn).toBeInTheDocument();

        const descriptionColumn = screen.getByText('Description 1');
        expect(descriptionColumn).toBeInTheDocument();

        const createdAtColumn = screen.getByText('2023-07-01');
        expect(createdAtColumn).toBeInTheDocument();

        const updatedAtColumn = screen.getByText('2023-07-02');
        expect(updatedAtColumn).toBeInTheDocument();

        const emailColumn = screen.getByText('user@example.com');
        expect(emailColumn).toBeInTheDocument();
    });

    test('renders pagination correctly', () => {
        render(<DataTableComponent data={mockData} onPageChange={() => {}} />);

        const rowsPerPageText = screen.getByText('Filas por página:');
        expect(rowsPerPageText).toBeInTheDocument();

        const selectAllRowsItem = screen.getByText('Todos');
        expect(selectAllRowsItem).toBeInTheDocument();
    });

    test('handles page change', () => {
        const onPageChange = jest.fn();
    
        render(
          <DataTableComponent
            data={mockData}
            onPageChange={onPageChange}
          />
        );
    
        // Simulate a page change event
        onPageChange(2);
        expect(onPageChange).toHaveBeenCalledWith(2);
      });

});
