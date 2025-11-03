import { Component } from '@angular/core';
import { searchData } from '../../../../core/utils/searchData';
import { MateriallistModule } from '../../../materiallist/materiallist-module';

@Component({
  selector: 'app-search-box',
  imports: [MateriallistModule],
  templateUrl: './search-box.html',
  styleUrl: './search-box.scss',
})
export class SearchBox {
  searchQuery: string = ''; // Track search input
  allItems: any[] = searchData;
  filteredResults: any[] = []; // Filtered search results

  // Filter the results based on the search query
  onSearch(): void {
    if (this.searchQuery) {
      this.filteredResults = this.allItems.filter((item) =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredResults = [];
    }
  }

  // When a search result is selected
  selectItem(item: any): void {
    this.searchQuery = item.name; // Set search query to selected item's name
    this.filteredResults = []; // Hide dropdown after selection
    //console.log('Selected Item:', item.name, item.baseUrl); // You can use item.baseUrl for further functionality
  }
}
