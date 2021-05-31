public class Test {
    static int [][] array = {
            {1,2,3,4,5},
            {6,7,8,9,10},
            {11,12,13,14,15},
            {16,17,18,19,20},
            {21,22,23,24,25}
    };
    public static void main(String[] args) {
        display(array);
    }

    public static void display(int[][] arr){
        int top = 0;
        int left = 0;
        int right = arr[0].length-1;
        int bottom = arr.length-1;
        System.out.println(right);
        System.out.println(bottom);
        while (top <= bottom && left <= right){
            // from arr[top,left] To arr[top,right]
            for(int i = left;i<=right;i++){
                System.out.print(arr[top][i]+",");
            }
            ++top;

            //from arr[top,right] To arr[bottom,right]
            for(int i = top;i<=bottom;i++){
                System.out.print(arr[i][right]+",");
            }
            --right;

            //from arr[bottom,right] To arr[bottom,left]
            for(int i = right;i >= left;i--){
                System.out.print(arr[bottom][i]+",");
            }
            --bottom;

            //from arr[bottom,left] To arr[top,left]
            for (int i = bottom;i >= top;i--){
                System.out.print(arr[i][left]+",");
            }
            ++left;
        }

    }

}