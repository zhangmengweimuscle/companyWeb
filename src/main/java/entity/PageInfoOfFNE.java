package entity;

public class PageInfoOfFNE {
    private int pageNum;
    private String keyWords;
    private String location;
    private String type;

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getArea() {
        return area;
    }

    public void setArea(int area) {
        this.area = area;
    }

    private int area;

    public int getPageNum() {
        return pageNum;
    }

    public void setPageNum(int pageNum) {
        this.pageNum = pageNum;
    }

    public String getKeyWords() {
        return keyWords;
    }

    public void setKeyWords(String keyWords) {
        this.keyWords = keyWords;
    }

    @Override
    public String toString() {
        return "PageInfoOfFNE{" +
                "pageNum=" + pageNum +
                ", keyWords='" + keyWords + '\'' +
                ", location='" + location + '\'' +
                ", type='" + type + '\'' +
                ", area=" + area +
                '}';
    }
}
