package it.unisa.control;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Base64;

import javax.imageio.ImageIO;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;

import org.apache.tomcat.jni.File;

import com.google.gson.Gson;

import it.unisa.model.giocatore.GiocatoreBean;
import it.unisa.model.giocatore.GiocatoreModel;
import it.unisa.model.gioco.GiocoModel;
import it.unisa.model.modalita.ModalitaModel;
import it.unisa.model.sponsor.SponsorModel;
import it.unisa.model.squadra.SquadraBean;
import it.unisa.model.squadra.SquadraModel;
import it.unisa.model.struttura.KeyStruttura;
import it.unisa.model.struttura.StrutturaBean;
import it.unisa.model.struttura.StrutturaModel;
import it.unisa.model.tecnico.TecnicoModel;
import it.unisa.model.torneo.TournamentModel;
import it.unisa.model.utente.UtenteBean;
import it.unisa.model.utente.UtenteModel;
import it.unisa.model.torneo.TournamentBean;
/**
 * Questa servlet si occupa della gestione dell'utente e della visualizzazione dei suoi tornei
 */

@WebServlet(urlPatterns = {"/UserControl","/user/UserControl"})
@MultipartConfig(fileSizeThreshold = 1024 * 1024 * 2, // 2MB after which the file will temporarily stored on disk
maxFileSize = 1024 * 1024 * 10, // 10MB maximum size allowed for uploaded files
maxRequestSize = 1024 * 1024 * 50) // 50MB overall size of all uploaded files
public class UserControl extends HttpServlet {
	private static final long serialVersionUID = 1L;
	TournamentModel tModel = new TournamentModel();
	GiocoModel gModel = new GiocoModel();
	UtenteModel userModel= new UtenteModel();
	StrutturaModel sModel= new StrutturaModel();
	SquadraModel teamModel= new SquadraModel();
	GiocatoreModel pModel=new GiocatoreModel();
	
    public UserControl() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session= request.getSession();
		String action = request.getParameter("action"); // azione da far compiere alla servlet
		Gson gson = new Gson();
		System.out.println("Sto facendo questa action: "+ action);
		UtenteBean utente=(UtenteBean)session.getAttribute("user");
		switch (action) {	
		/**
		 * Questa action serve a prendere tutti i tornei di un dato utente
		 * identificato univocamente dalla sua mail
		 */
		case "getTorneo":
			
			try {
				response.setContentType("application/json");
				response.setCharacterEncoding("UTF-8");
				String codice=request.getParameter("codice");
				UtenteBean bean=(UtenteBean)session.getAttribute("user");
				String torneo="";
				TournamentBean tornei = tModel.doRetriveByKey(codice);
			
				if(bean!=null) 
					torneo=gson.toJson(tornei.getProprietario().equals(bean.getEmail()));
				else
					torneo=gson.toJson("false");
				System.out.println("ciao mamma, questo � il torneo selezionato");
				response.getWriter().print(torneo);
				response.getWriter().flush();
				response.setStatus(200);
				}
				
			catch(SQLException e2) {
				e2.printStackTrace();
			}
			break;
			
		case "getMieiTornei":
			
		try {
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			UtenteBean user=(UtenteBean) session.getAttribute("user");
			String email=user.getEmail();
			String torneo="";
			ArrayList<TournamentBean> tornei = (ArrayList<TournamentBean>) tModel.doRetriveByUser(email);
			ArrayList<String>strutture=new ArrayList<String>();
			for(TournamentBean t:tornei) {
				strutture.add(sModel.doRetriveByKey(new KeyStruttura(String.valueOf(t.getCAPStruttura()), t.getIndirizzoStruttura())).getNome());
			}
			ArrayList<ArrayList<?>>tutto=new ArrayList<ArrayList<?>>();
			tutto.add(tornei);
			tutto.add(strutture);
			torneo=gson.toJson(tutto);
			System.out.println("Il JSON dei tornei e' stato creato con successo");
			response.getWriter().print(torneo);
			response.getWriter().flush();
			response.setStatus(200);
		}
		catch(SQLException e2) {	
			e2.printStackTrace();
		}
		break;
		
		/**
		 * Questa action serve a prendere i nomi e le immagini di tutti i giocatori di una data squadra
		 */
		case "getGiocatoriFromSquadra":
			response.setCharacterEncoding("UTF-8");
			response.setContentType("application/json");			
			
			try {
				String nome=(String)request.getParameter("nomeSquadra");
				ArrayList<GiocatoreBean> squadre= (ArrayList<GiocatoreBean>) teamModel.doRetrivePlayerFromSquadra(nome);
				ArrayList<String> names= new ArrayList<String>();
				ArrayList<String> images= new ArrayList<String>();
				
				for(GiocatoreBean b:squadre) {
					names.add(b.getNickname());
				}
				
				for(GiocatoreBean be:squadre) {
					images.add(be.getPlayerImage());
				}
				
				ArrayList<ArrayList<?>> cose= new ArrayList<ArrayList<?>>();
				cose.add(names);
				cose.add(images);
				String mode=gson.toJson(cose);
				response.getWriter().print(mode);
				response.getWriter().flush();
				System.out.println("il json dei giocatori della squadra "+nome+" e' stato creato con successo");
				response.setStatus(200);
			} catch (SQLException e) {
				response.sendError(404);
				e.printStackTrace();
			}
			break;
			
			/**
			 * Questa action serve a restituire tutti i dati di un giocatore
			 * identificato univocamente dal proprio nickname
			 */
		case "getDatiGiocatore":
			
			try {

				String nick=request.getParameter("nick");
				GiocatoreBean beanp=pModel.doRetriveByKey(nick);
				ArrayList<GiocatoreBean> beans= new ArrayList<GiocatoreBean>();
				beans.add(beanp);
				String datip=gson.toJson(beans);
				response.getWriter().print(datip);
				response.getWriter().flush();
				System.out.println("il json del giocatore "+nick+" e' stato creato con successo");
				response.setStatus(200);
			
			
			} catch (SQLException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			
			
			break;
		/**
		 * Questa action viene utilizzata per prendere tutte le squadre di un
		 * dato torneo, identificato univocamente dal suo codice
		 */
		case "getSquadreFromTorneo":
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			
			int codTorneo=Integer.parseInt(request.getParameter("codTorneo"));
			System.out.println(codTorneo);
			ArrayList<SquadraBean> squadre=(ArrayList<SquadraBean>) userModel.getSquadreFromTornei(codTorneo);
			ArrayList<String> dati= new ArrayList<String>();
			
			try {
				TournamentBean bean= tModel.doRetriveByKey(String.valueOf(codTorneo));
				StrutturaBean struttura=sModel.doRetriveByKey(new KeyStruttura(String.valueOf(bean.getCAPStruttura()), bean.getIndirizzoStruttura()));
				dati.add(bean.getNome());
				dati.add(struttura.getNome());
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			/*for(String s:dati) {
				System.out.println(s);
			}*/
			
			ArrayList<ArrayList<?>> cose= new ArrayList<ArrayList<?>>();
			cose.add(squadre);
			cose.add(dati);
			String squadra=gson.toJson(cose);
			System.out.println("Ciao questi sono le squadre del torneo");
			response.getWriter().print(squadra);
			response.getWriter().flush();
			response.setStatus(200);
			
			break;
		/*
		 * Questa action fittizia serve a chiamare la pagina di visualizzazione delle squadre del torneo
		 * senza pero' mostrare nell'url il nome della squadra 
		 */
		case "visualizza":
			
			session.setAttribute("cod",request.getParameter("codtorneo"));
			response.sendRedirect(response.encodeRedirectURL(request.getContextPath()+"/torneo.jsp"));
			
		break;
		/**
		 * Questa action fittizia serve a chiamare la pagina di visualizzazione di una squadra
		 * partecipante ad un torneo senza pero' mostrare nell'url il nome della squadra 
		 */
		case "visualizzaSquadra":
			session.setAttribute("nome",request.getParameter("nomeSquadra"));
			System.out.println(request.getParameter("nomeSquadra"));
			response.sendRedirect(response.encodeRedirectURL(request.getContextPath()+"/squadraView.jsp"));
		break;
		
			/**
			 * Questo case viene chiamato nel caso in cui l'utente voglia cambiare qualche campo delle 
			 * proprie informazioni.
			 * 
			 * Per chiamare questo case e' necessario specificare:
			 * -cosa: il campo da modificare email|user|piva
			 * -valore: il valore da modificare nel campo
			 * 
			 * Una validazione preventiva viene eseguita nel caso l'utente cerchi di modificare i suoi dati 
			 * inserendone altri o non correttamente scritti oppure gia' associati a qualche altro utente
			 */
		case "modificaImg":
			try (ByteArrayOutputStream bos = new ByteArrayOutputStream()){
			Part part = request.getPart("images"); //Prende la parte dal multipart form che rappresenta l'immagine di profilo dell'utente
			ArrayList<Part> partii=(ArrayList<Part>) request.getParts();
			
			System.out.println("****inizio parti*****");
			for(Part p:partii) {
				System.out.println(p.getName());
			}
			System.out.println("****fine parti*****");			
			InputStream fis = null;
			
			fis = part.getInputStream();
			//System.out.println("Immagine trovata");
			byte[] buf = new byte[4096];

			for (int readNum; (readNum = fis.read(buf)) != -1;) {
				bos.write(buf, 0, readNum); // no doubt here is 0
				System.out.println("read " + readNum + " bytes,");
			}
			byte[] bytes = bos.toByteArray();
			
			String img="data:image/jpeg;base64, " + Base64.getEncoder().encodeToString(bytes);
			System.out.println("bytes immagine "+bytes.length);
			UtenteBean user=(UtenteBean) request.getSession().getAttribute("user");
			userModel.cambiaImg(img,user.getEmail());
			user.setImg(img);
			response.sendRedirect(response.encodeRedirectURL("Profilo.jsp"));
			}
			break;
		
		case "modificaDati":
			
			
			String nome=request.getParameter("nome");
			System.out.println("MAMMETA:"+nome);
			String email=request.getParameter("email");
			String iva=request.getParameter("iva");
			String oldEmail=request.getParameter("oldEmail");
			String oldPass=request.getParameter("oldPass");
			String newPass=request.getParameter("newPass");
			String regUser="^[A-Za-z0-9_-]{0,30}$";
			String regEmail="^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$";
			String regIva="^[0-9]{11}$";
			

			System.out.println("Sto nel change");
			
			//Impostiamogli eventuali errori avuti in precedenza a null per evitare problemi nella visualizzazione
			
			session.setAttribute("error", null); // error ci fornisce il messaggio di errore da visualizzare
			
			session.setAttribute("error-type", null); //error-type ci fornisce il campo sul quale abbiamo riscontrato l'errore
						
		
				if(!email.matches(regEmail))
				{session.setAttribute("error", "la mail scelta non e' valida");
				session.setAttribute("error-type", "mail");
				response.sendRedirect(response.encodeRedirectURL(request.getContextPath()+"/user/Profilo.jsp"));
				return;

				}
				else
				if(!userModel.isExistingEmail(email)) { 					//se la nuova mail non e' gia' presente nel db
					userModel.cambiaEmail(email, utente.getEmail());		//la cambio
				}
				else {														
					
					session.setAttribute("error", "la mail scelta e' gia' stata utilizzato"); //altrimenti setto gli errori
					session.setAttribute("error-type", "mail");
					response.sendRedirect(response.encodeRedirectURL(request.getContextPath()+"/user/Profilo.jsp"));
					return;
				}
				
		
			
															
				if(!nome.matches(regUser))
				{session.setAttribute("error", "lo username inserito non e' valido");
				session.setAttribute("error-type", "username");
				response.sendRedirect(response.encodeRedirectURL(request.getContextPath()+"/user/Profilo.jsp"));
				return;
				}
				else
				if(!userModel.isExistingUsername(nome)) {					//se il nuovo username non e' presente nel db
					userModel.cambiaUsername(nome, utente.getEmail());	//lo cambio
				}
				else {														
					
					session.setAttribute("error", "l'username scelto e' gia' stato utilizzato");//altrimenti setto gli errori
					session.setAttribute("error-type", "username");
					response.sendRedirect(response.encodeRedirectURL(request.getContextPath()+"/user/Profilo.jsp"));
					
				}
				
	
				if(!iva.matches(regIva))
				{session.setAttribute("error", "la partita IVA inserita non e' valida");
				session.setAttribute("error-type", "piva");
				response.sendRedirect(response.encodeRedirectURL(request.getContextPath()+"/user/Profilo.jsp"));
				return;

				}
				else
				if(!userModel.isExistingPIVA(iva)) {						//se la nuova p.IVA non e' presente nel db
					userModel.cambiaPIVA(iva, utente.getpIVA());		//la cambio
				}
				else {														//altrimenti setto gli errori
					
					session.setAttribute("error", "la partita iva scelta e' gia' stata utilizzato");
					session.setAttribute("error-type", "piva");
					response.sendRedirect(response.encodeRedirectURL(request.getContextPath()+"/user/Profilo.jsp"));
					return;

				}
				
				userModel.cambiaPIVA(iva, oldEmail);
				userModel.cambiaUsername(nome, oldEmail);
				
				
				
				if(newPass!=""&&oldPass!="")
				try {System.out.println("Provo a cambiare password da:"+oldPass+" a "+newPass);
				System.out.println("Sto nel try prima del cambio pass:");
				
				
					userModel.cambiaPassword(oldEmail, newPass, oldPass);
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}	
				userModel.cambiaEmail(email, oldEmail);

				break;
		
			}//chiusura switch(action)
		
		}
	

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}
	
	
	
	

}
