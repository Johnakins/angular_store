import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from '../../../../services/store.service';
import { Category } from '../../../../models/category.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();
  categories: Category[] | undefined;
  categoriesSubscription: Subscription | undefined;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.categoriesSubscription = this.storeService
      .getAllCategories()
      .subscribe((response: any) => {
        // console.log(response.map((cat: { categoryName: string; }) => cat.categoryName));
        this.categories = response;
      });
  }

  onShowCategory(category: { categoryName: string; }): void {
    this.showCategory.emit(category.categoryName);
  }

  // onShowCategory(category: { categoryName: string }): void {
  //   const categoryName = category.categoryName !== "all" ? category.categoryName : '';
  //   this.showCategory.emit(categoryName);
  //   this.category = { categoryName };
  //   this.getProducts();
  // }

  onShowAll(): void {
    this.storeService.getAllProducts();
  }

  ngOnDestroy(): void {
     if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }
}