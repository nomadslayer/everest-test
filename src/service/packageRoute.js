function PackageRoute({
    packages_to_deliver,
    max_carriable_weight,
  }) {
    // define variables to hold local data
    let all_packages = [...packages_to_deliver];
    let combined_packages = [];
    let temp_array = [];
  
    // define knapSack
    const knapSack = (pkgs, n, capacity, itemsArr) => {
      //base case, check if more iterations are needed
      if (capacity < 0 || n < 0 || capacity === 0) {
        // if final itteration then hold the current values
        if (capacity >= 0) {
          temp_array = [
            ...temp_array,
            { total_weight: max_carriable_weight - capacity, itemsArr },
          ];
        }
  
        // return zero on final iteration
        return 0;
      }
      // if not any of the above base case then iterate
      else {
        // pick the current item and iterate for more values
        let include =
          pkgs[n].pkg_weight_perkg +
          knapSack(pkgs, n - 1, capacity - pkgs[n].pkg_weight_perkg, [
            ...itemsArr,
            pkgs[n],
          ]);
  
        // do not pick the current item and iterate
        let exclude = knapSack(pkgs, n - 1, capacity, itemsArr);
  
        // return maximum value amonge two values
        return Math.max(include, exclude);
      }
    };
  
    // iterate while package exists
    while (all_packages.length) {
      // get the best combinations out of the packages
      knapSack(all_packages, all_packages.length - 1, max_carriable_weight, []);
  
      // add the current item to the list of packages
      combined_packages = [
        ...combined_packages,
        temp_array.reduce(function (prev, current) {
          return prev.total_weight > current.total_weight ? prev : current;
        }),
      ];
  
      // get the package ids which SHOULD be removed for the next cycle
      const pkg_ids_to_be_removed = combined_packages
        .map((item) => {
          return item.itemsArr;
        })
        .flat()
        .map((item) => item.pkg_id);
  
      // remove the computed packages from array
      all_packages = all_packages.filter((item) => {
        return !pkg_ids_to_be_removed.includes(item.pkg_id);
      });
  
      // reset variables
      temp_array = [];
    }
  
    // return the data
    return combined_packages;
  }
  
  // export function
  module.exports = { PackageRoute };
  