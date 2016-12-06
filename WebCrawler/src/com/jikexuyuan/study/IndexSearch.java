 /**  
 *@Description:索引检索demo
 */ 
package com.jikexuyuan.study;  

import java.io.File;

import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.TopDocs;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.apache.lucene.util.Version;
  
public class IndexSearch {

	/**  
	 * @param args
	 * @Author:lulei  
	 * @Description:  
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub  
		Directory directory = null;
		try {
			//索引硬盘存储路径
			directory = FSDirectory.open(new File("D://index/test"));
			//读取索引
			DirectoryReader dReader = DirectoryReader.open(directory);
			//创建索引检索对象
			IndexSearcher searcher = new IndexSearcher(dReader);
			//分词技术
			Analyzer analyzer = new StandardAnalyzer(Version.LUCENE_43);
			//创建Query
			QueryParser parser = new QueryParser(Version.LUCENE_43, "content", analyzer);
			Query query = parser.parse("Lucene案例");
			//检索索引，获取符合条件的前10条记录
			TopDocs topDocs = searcher.search(query, 10);
			if (topDocs != null) {
				System.out.println("符合条件的文档总数为：" + topDocs.totalHits);
				//循环输出符合条件的文档
				for (int i = 0; i < topDocs.scoreDocs.length; i++) {
					//topDocs.scoreDocs[i].doc 为文档在索引中的id
					Document doc = searcher.doc(topDocs.scoreDocs[i].doc);
					System.out.println("id = " + doc.get("id"));
					System.out.println("content = " + doc.get("content"));
					System.out.println("num = " + doc.get("num"));
				}
			}
			//关闭资源
			directory.close();
			dReader.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block  
			e.printStackTrace();
		}

	}

}
