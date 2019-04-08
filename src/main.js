import './main.scss';
import html2canvas from 'html2canvas'
import jsPDF from 'jsPDF'

var downPdf = document.getElementById("downloadPdf");
var contentPdf = document.getElementById("contentPdf");
downPdf.onclick = function() {
    console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-')
    html2canvas(contentPdf, {
        onrendered:function(canvas) {

            //返回图片dataURL，参数：图片格式和清晰度(0-1)
            var pageData = canvas.toDataURL('image/jpeg', 1.0);

            //方向默认竖直，尺寸ponits，格式a4[595.28,841.89]
            var pdf = new jsPDF('', 'pt', 'a4');

            //addImage后两个参数控制添加图片的尺寸，此处将页面高度按照a4纸宽高比列进行压缩
            pdf.addImage(pageData, 'JPEG', 0, 0, 595.28, 592.28/canvas.width * canvas.height );

            pdf.save('stone.pdf');

        }
    })
}
